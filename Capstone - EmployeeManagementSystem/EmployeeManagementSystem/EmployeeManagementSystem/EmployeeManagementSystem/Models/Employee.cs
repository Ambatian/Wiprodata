namespace EmployeeManagementSystem.Models;
public class Employee
{
    public int EmployeeId { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }

    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string? JobTitle { get; set; }
    public int DepartmentId { get; set; }
    public Department? Department { get; set; }

    public int? ManagerId { get; set; }
    public Employee? Manager { get; set; }

    public DateTime HireDate { get; set; } = DateTime.UtcNow;
}
