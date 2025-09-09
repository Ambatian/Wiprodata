namespace EmployeeManagementSystem.Dtos;
public class RegisterDto
{
    public string Email { get; set; } = default!;
    public string Password { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? JobTitle { get; set; }
    public int DepartmentId { get; set; }
    public int RoleId { get; set; } // 1=HR, 2=Manager, 3=Employee
}
