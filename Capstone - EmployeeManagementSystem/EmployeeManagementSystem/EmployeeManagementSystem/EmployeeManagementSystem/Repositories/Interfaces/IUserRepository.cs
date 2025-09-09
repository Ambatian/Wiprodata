using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories;
public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(int userId);
    Task AddAsync(User user);
    Task<bool> EmailExistsAsync(string email);
    Task SaveAsync();
}
