using EmployeeManagementSystem.Dtos;

namespace EmployeeManagementSystem.Services;
public interface IAuthService
{
    Task<LoginResultDto?> LoginAsync(string email, string password);
    Task<bool> RegisterAsync(RegisterDto dto);
}
