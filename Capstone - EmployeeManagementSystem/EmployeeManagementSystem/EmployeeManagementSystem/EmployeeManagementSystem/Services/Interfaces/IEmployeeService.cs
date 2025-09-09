using EmployeeManagementSystem.Dtos;

namespace EmployeeManagementSystem.Services;
public interface IEmployeeService
{
    Task<List<EmployeeViewDto>> GetAllAsync(string role, int userId);
    Task<EmployeeViewDto?> GetByIdAsync(int id, string role, int userId);
    Task<EmployeeViewDto> CreateAsync(EmployeeDto dto);
    Task<EmployeeViewDto?> UpdateAsync(int id, EmployeeDto dto);
    Task<bool> DeleteAsync(int id);
}
