namespace EmployeeManagementSystem.Dtos;
public class EmployeeDto
{
    public int? UserId { get; set; } // optional for admin-created profile
    public string Email { get; set; } = default!;
    public string? Password { get; set; } // only when creating a new user
    public int RoleId { get; set; } = 3;

    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? JobTitle { get; set; }
    public int DepartmentId { get; set; }
    public int? ManagerId { get; set; }
}
