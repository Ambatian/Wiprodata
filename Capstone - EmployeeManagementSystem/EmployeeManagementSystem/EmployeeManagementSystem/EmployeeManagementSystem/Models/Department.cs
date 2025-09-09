namespace EmployeeManagementSystem.Models;
public class Department
{
    public int DepartmentId { get; set; }
    public string Name { get; set; } = default!;
    public ICollection<Employee>? Employees { get; set; }
}
