using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Repositories;
public interface ILeaveRepository
{
    Task<LeaveRequest> AddAsync(LeaveRequest req);
    Task<List<LeaveRequest>> GetAllAsync();
    Task<List<LeaveRequest>> GetByEmployeeAsync(int employeeId);
    Task<LeaveRequest?> GetByIdAsync(int id);
    Task<LeaveRequest?> UpdateAsync(LeaveRequest req);
    Task SaveAsync();
}
