namespace EmployeeManagementSystem.Models;
public enum LeaveStatus { Pending = 0, Approved = 1, Rejected = 2 }

public class LeaveRequest
{
    public int LeaveRequestId { get; set; }
    public int EmployeeId { get; set; }
    public Employee? Employee { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Reason { get; set; }
    public LeaveStatus Status { get; set; } = LeaveStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int? ActionByEmployeeId { get; set; } // approver (HR/Manager)
}
