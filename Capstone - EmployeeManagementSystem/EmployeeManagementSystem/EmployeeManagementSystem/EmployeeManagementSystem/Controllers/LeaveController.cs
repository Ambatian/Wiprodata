using System.Security.Claims;
using EmployeeManagementSystem.Dtos;
using EmployeeManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class LeavesController : ControllerBase
{
    private readonly ILeaveService _svc;
    public LeavesController(ILeaveService svc) { _svc = svc; }

    private (int userId, string role) GetUser() =>
        (int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!), User.FindFirstValue(ClaimTypes.Role)!);

    // Employee applies for leave (self); HR/Manager can also submit for someone if needed
    [HttpPost]
    public async Task<IActionResult> Apply([FromBody] LeaveRequestDto dto)
    {
        var (uid, _) = GetUser();
        var created = await _svc.ApplyAsync(dto.EmployeeId, dto);
        return Ok(created);
    }

    // List leaves (role-scoped)
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var (uid, role) = GetUser();
        var data = await _svc.GetAllAsync(role, uid);
        return Ok(data);
    }

    // Approve/Reject (HR or Manager)
    [HttpPut("{id:int}/status")]
    [Authorize(Roles = "HR,Manager")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] LeaveStatusUpdateDto dto)
    {
        var (uid, _) = GetUser();
        var updated = await _svc.UpdateStatusAsync(id, dto.Status, uid);
        return updated is null ? NotFound() : Ok(updated);
    }
}
