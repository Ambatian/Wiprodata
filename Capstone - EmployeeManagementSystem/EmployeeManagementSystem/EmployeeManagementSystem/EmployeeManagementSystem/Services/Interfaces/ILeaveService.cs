using EmployeeManagementSystem.Dtos;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Services;
public interface ILeaveService
{
    Task<LeaveRequest> ApplyAsync(int employeeId, LeaveRequestDto dto);
    Task<List<LeaveRequest>> GetAllAsync(string role, int userId);
    Task<LeaveRequest?> UpdateStatusAsync(int leaveId, string status, int actedByUserId);
}
