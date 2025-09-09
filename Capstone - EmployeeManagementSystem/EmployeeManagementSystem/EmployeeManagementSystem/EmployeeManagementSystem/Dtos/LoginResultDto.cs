using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Dtos;
public class LoginResultDto
{
    public string Token { get; set; } = default!;
    public User User { get; set; } = default!;
}
