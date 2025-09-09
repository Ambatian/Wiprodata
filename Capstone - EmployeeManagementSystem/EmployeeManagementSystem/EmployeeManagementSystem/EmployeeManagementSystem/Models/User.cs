namespace EmployeeManagementSystem.Models;
public class User
{
    public int UserId { get; set; }
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!; // plain for demo
    public int RoleId { get; set; }
    public Role? Role { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Employee? Employee { get; set; }
}
