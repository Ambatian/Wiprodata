using EmployeeManagementSystem.Dtos;
using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Repositories;

namespace EmployeeManagementSystem.Services;
public class LeaveService : ILeaveService
{
    private readonly ILeaveRepository _repo;
    private readonly IEmployeeRepository _employees;

    public LeaveService(ILeaveRepository repo, IEmployeeRepository employees)
    { _repo = repo; _employees = employees; }

    public async Task<LeaveRequest> ApplyAsync(int employeeId, LeaveRequestDto dto)
    {
        // allow self or manager applying for subordinate
        if (employeeId != dto.EmployeeId) dto.EmployeeId = employeeId;

        var req = new LeaveRequest
        {
            EmployeeId = dto.EmployeeId,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            Reason = dto.Reason,
            Status = LeaveStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };
        return await _repo.AddAsync(req);
    }

    public async Task<List<LeaveRequest>> GetAllAsync(string role, int userId)
    {
        if (role == "HR")
            return await _repo.GetAllAsync();

        var me = await _employees.GetByUserIdAsync(userId);
        if (me is null) return new();

        if (role == "Manager")
        {
            var team = await _employees.GetByManagerAsync(me.EmployeeId);
            var teamIds = team.Select(t => t.EmployeeId).Append(me.EmployeeId).ToHashSet();
            var all = await _repo.GetAllAsync();
            return all.Where(l => teamIds.Contains(l.EmployeeId)).ToList();
        }

        // Employee → only self
        return await _repo.GetByEmployeeAsync(me.EmployeeId);
    }

    public async Task<LeaveRequest?> UpdateStatusAsync(int leaveId, string status, int actedByUserId)
    {
        var req = await _repo.GetByIdAsync(leaveId);
        if (req is null) return null;

        var normalized = status.Trim().ToLowerInvariant();
        req.Status = normalized switch
        {
            "approve" or "approved" => LeaveStatus.Approved,
            "reject" or "rejected" => LeaveStatus.Rejected,
            _ => LeaveStatus.Pending
        };

        // record approver
        var approver = await _employees.GetByUserIdAsync(actedByUserId);
        req.ActionByEmployeeId = approver?.EmployeeId;

        return await _repo.UpdateAsync(req);
    }
}
