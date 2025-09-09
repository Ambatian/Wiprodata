using EmployeeManagementSystem.Dtos;
using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Repositories;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Services;
public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _repo;
    private readonly IUserRepository _users;
    private readonly EmployeeManagementDbContext _db;

    public EmployeeService(IEmployeeRepository repo, IUserRepository users, EmployeeManagementDbContext db)
    { _repo = repo; _users = users; _db = db; }

    public async Task<List<EmployeeViewDto>> GetAllAsync(string role, int userId)
    {
        var all = await _repo.GetAllAsync();

        // Scope by role
        if (role == "Employee")
        {
            var self = await _repo.GetByUserIdAsync(userId);
            return self is null ? new() : new List<EmployeeViewDto> { Map(self) };
        }
        if (role == "Manager")
        {
            var me = await _repo.GetByUserIdAsync(userId);
            if (me is null) return new();
            var team = await _repo.GetByManagerAsync(me.EmployeeId);
            team.Insert(0, me); // include self
            return team.Select(Map).ToList();
        }

        // HR sees everyone
        return all.Select(Map).ToList();
    }

    public async Task<EmployeeViewDto?> GetByIdAsync(int id, string role, int userId)
    {
        var e = await _repo.GetByIdAsync(id);
        if (e is null) return null;

        if (role == "Employee")
        {
            var self = await _repo.GetByUserIdAsync(userId);
            if (self is null || self.EmployeeId != id) return null;
        }
        else if (role == "Manager")
        {
            var me = await _repo.GetByUserIdAsync(userId);
            if (me is null) return null;
            var teamIds = (await _repo.GetByManagerAsync(me.EmployeeId)).Select(x => x.EmployeeId).ToHashSet();
            if (e.EmployeeId != me.EmployeeId && !teamIds.Contains(e.EmployeeId)) return null;
        }

        return Map(e);
    }

    public async Task<EmployeeViewDto> CreateAsync(EmployeeDto dto)
    {
        // Create user if not provided
        int userId;
        if (dto.UserId is null)
        {
            if (await _users.EmailExistsAsync(dto.Email)) throw new InvalidOperationException("Email already exists");
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = dto.Password ?? "changeme",
                RoleId = dto.RoleId,
                CreatedAt = DateTime.UtcNow
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            userId = user.UserId;
        }
        else userId = dto.UserId.Value;

        var emp = new Employee
        {
            UserId = userId,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            JobTitle = dto.JobTitle,
            DepartmentId = dto.DepartmentId,
            ManagerId = dto.ManagerId,
            HireDate = DateTime.UtcNow
        };
        emp = await _repo.AddAsync(emp);
        return Map(await _repo.GetByIdAsync(emp.EmployeeId)!);
    }

    public async Task<EmployeeViewDto?> UpdateAsync(int id, EmployeeDto dto)
    {
        var current = await _repo.GetByIdAsync(id);
        if (current is null) return null;

        current.FirstName = dto.FirstName;
        current.LastName = dto.LastName;
        current.JobTitle = dto.JobTitle;
        current.DepartmentId = dto.DepartmentId;
        current.ManagerId = dto.ManagerId;

        var updated = await _repo.UpdateAsync(current);
        return updated is null ? null : Map(updated);
    }

    public Task<bool> DeleteAsync(int id) => _repo.DeleteAsync(id);

    private static EmployeeViewDto Map(Employee e) => new()
    {
        EmployeeId = e.EmployeeId,
        UserId = e.UserId,
        Email = e.User?.Email ?? "",
        FirstName = e.FirstName,
        LastName = e.LastName,
        JobTitle = e.JobTitle,
        Department = e.Department?.Name ?? "",
        ManagerId = e.ManagerId,
        ManagerName = e.Manager is null ? null : $"{e.Manager.FirstName} {e.Manager.LastName}",
        Role = e.User?.Role?.RoleName ?? ""
    };
}
