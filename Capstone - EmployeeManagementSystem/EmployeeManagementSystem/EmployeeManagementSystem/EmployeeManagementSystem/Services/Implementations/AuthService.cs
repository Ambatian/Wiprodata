using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EmployeeManagementSystem.Dtos;
using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Repositories;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeManagementSystem.Services;
public class AuthService : IAuthService
{
    private readonly IUserRepository _users;
    private readonly IEmployeeRepository _employees;
    private readonly EmployeeManagementDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(IUserRepository users, IEmployeeRepository employees, EmployeeManagementDbContext db, IConfiguration config)
    {
        _users = users; _employees = employees; _db = db; _config = config;
    }

    public async Task<LoginResultDto?> LoginAsync(string email, string password)
    {
        var user = await _users.GetByEmailAsync(email);
        if (user is null || user.PasswordHash != password) return null; // replace with hashing in prod

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role?.RoleName ?? "Employee")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims,
            expires: DateTime.UtcNow.AddHours(8), signingCredentials: creds);

        return new LoginResultDto { Token = new JwtSecurityTokenHandler().WriteToken(token), User = user };
    }

    public async Task<bool> RegisterAsync(RegisterDto dto)
    {
        if (await _users.EmailExistsAsync(dto.Email)) return false;

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = dto.Password, // hash in prod
            RoleId = dto.RoleId,
            CreatedAt = DateTime.UtcNow
        };
        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        _db.Employees.Add(new Employee
        {
            UserId = user.UserId,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            JobTitle = dto.JobTitle,
            DepartmentId = dto.DepartmentId,
            HireDate = DateTime.UtcNow
        });
        await _db.SaveChangesAsync();
        return true;
    }
}
