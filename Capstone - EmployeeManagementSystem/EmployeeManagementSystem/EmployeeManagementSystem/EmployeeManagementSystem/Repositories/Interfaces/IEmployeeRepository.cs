using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories;
public interface IEmployeeRepository
{
    Task<List<Employee>> GetAllAsync();
    Task<Employee?> GetByIdAsync(int id);
    Task<Employee?> GetByUserIdAsync(int userId);
    Task<List<Employee>> GetByManagerAsync(int managerEmployeeId);
    Task<Employee> AddAsync(Employee employee);
    Task<Employee?> UpdateAsync(Employee employee);
    Task<bool> DeleteAsync(int id);
    Task SaveAsync();
}
