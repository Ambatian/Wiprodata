namespace EmployeeManagementSystem.Dtos;
public class EmployeeViewDto
{
    public int EmployeeId { get; set; }
    public int UserId { get; set; }
    public string Email { get; set; } = default!;
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? JobTitle { get; set; }
    public string Department { get; set; } = default!;
    public int? ManagerId { get; set; }
    public string? ManagerName { get; set; }
    public string Role { get; set; } = default!;
}
