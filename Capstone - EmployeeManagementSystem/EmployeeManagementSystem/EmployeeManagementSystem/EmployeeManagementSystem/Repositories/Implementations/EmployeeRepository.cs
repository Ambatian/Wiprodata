using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Repositories;
public class EmployeeRepository : IEmployeeRepository
{
    private readonly EmployeeManagementDbContext _db;
    public EmployeeRepository(EmployeeManagementDbContext db) { _db = db; }

    public Task<List<Employee>> GetAllAsync() =>
        _db.Employees.Include(e => e.User).ThenInclude(u => u!.Role).Include(e => e.Department).Include(e => e.Manager).ToListAsync();

    public Task<Employee?> GetByIdAsync(int id) =>
        _db.Employees.Include(e => e.User).ThenInclude(u => u!.Role).Include(e => e.Department).Include(e => e.Manager)
            .FirstOrDefaultAsync(e => e.EmployeeId == id)!;

    public Task<Employee?> GetByUserIdAsync(int userId) =>
        _db.Employees.Include(e => e.User).ThenInclude(u => u!.Role).Include(e => e.Department).Include(e => e.Manager)
            .FirstOrDefaultAsync(e => e.UserId == userId)!;

    public Task<List<Employee>> GetByManagerAsync(int managerEmployeeId) =>
        _db.Employees.Include(e => e.User).ThenInclude(u => u!.Role).Include(e => e.Department)
            .Where(e => e.ManagerId == managerEmployeeId).ToListAsync();

    public async Task<Employee> AddAsync(Employee employee)
    {
        _db.Employees.Add(employee);
        await _db.SaveChangesAsync();
        return employee;
    }

    public async Task<Employee?> UpdateAsync(Employee employee)
    {
        var existing = await _db.Employees.FindAsync(employee.EmployeeId);
        if (existing is null) return null;
        _db.Entry(existing).CurrentValues.SetValues(employee);
        await _db.SaveChangesAsync();
        return existing;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var e = await _db.Employees.FindAsync(id);
        if (e is null) return false;
        _db.Employees.Remove(e);
        await _db.SaveChangesAsync();
        return true;
    }

    public Task SaveAsync() => _db.SaveChangesAsync();
}
