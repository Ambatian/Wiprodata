using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem.Repositories;
public class LeaveRepository : ILeaveRepository
{
    private readonly EmployeeManagementDbContext _db;
    public LeaveRepository(EmployeeManagementDbContext db) { _db = db; }

    public async Task<LeaveRequest> AddAsync(LeaveRequest req)
    {
        _db.LeaveRequests.Add(req);
        await _db.SaveChangesAsync();
        return req;
    }

    public Task<List<LeaveRequest>> GetAllAsync() =>
        _db.LeaveRequests.Include(l => l.Employee).ThenInclude(e => e!.User).ToListAsync();

    public Task<List<LeaveRequest>> GetByEmployeeAsync(int employeeId) =>
        _db.LeaveRequests.Include(l => l.Employee).ThenInclude(e => e!.User).Where(l => l.EmployeeId == employeeId).ToListAsync();

    public Task<LeaveRequest?> GetByIdAsync(int id) =>
        _db.LeaveRequests.Include(l => l.Employee).ThenInclude(e => e!.User).FirstOrDefaultAsync(l => l.LeaveRequestId == id)!;

    public async Task<LeaveRequest?> UpdateAsync(LeaveRequest req)
    {
        var existing = await _db.LeaveRequests.FindAsync(req.LeaveRequestId);
        if (existing is null) return null;
        _db.Entry(existing).CurrentValues.SetValues(req);
        await _db.SaveChangesAsync();
        return existing;
    }

    public Task SaveAsync() => _db.SaveChangesAsync();
}
