namespace EmployeeManagementSystem.Dtos;
public class LeaveRequestDto
{
    public int EmployeeId { get; set; } // self or subordinate
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Reason { get; set; }
}
