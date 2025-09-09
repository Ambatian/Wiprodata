using System.Security.Claims;
using EmployeeManagementSystem.Dtos;
using EmployeeManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmployeesController : ControllerBase
{
    private readonly IEmployeeService _svc;
    public EmployeesController(IEmployeeService svc) { _svc = svc; }

    private (int userId, string role) GetUser() =>
        (int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!), User.FindFirstValue(ClaimTypes.Role)!);

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var (uid, role) = GetUser();
        var data = await _svc.GetAllAsync(role, uid);
        return Ok(data);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var (uid, role) = GetUser();
        var e = await _svc.GetByIdAsync(id, role, uid);
        return e is null ? Forbid() : Ok(e);
    }

    // HR can create employees (with or without new user)
    [HttpPost]
    [Authorize(Roles = "HR")]
    public async Task<IActionResult> Create([FromBody] EmployeeDto dto)
    {
        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(Get), new { id = created.EmployeeId }, created);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = "HR")]
    public async Task<IActionResult> Update(int id, [FromBody] EmployeeDto dto)
    {
        var updated = await _svc.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "HR")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _svc.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }
}
