using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Repositories;
public class UserRepository : IUserRepository
{
    private readonly EmployeeManagementDbContext _db;
    public UserRepository(EmployeeManagementDbContext db) { _db = db; }

    public Task<User?> GetByEmailAsync(string email) =>
        _db.Users.Include(u => u.Role).Include(u => u.Employee).FirstOrDefaultAsync(u => u.Email == email)!;

    public Task<User?> GetByIdAsync(int userId) =>
        _db.Users.Include(u => u.Role).Include(u => u.Employee).FirstOrDefaultAsync(u => u.UserId == userId)!;

    public async Task AddAsync(User user) { _db.Users.Add(user); await _db.SaveChangesAsync(); }

    public Task<bool> EmailExistsAsync(string email) =>
        _db.Users.AnyAsync(u => u.Email == email);

    public Task SaveAsync() => _db.SaveChangesAsync();
}
