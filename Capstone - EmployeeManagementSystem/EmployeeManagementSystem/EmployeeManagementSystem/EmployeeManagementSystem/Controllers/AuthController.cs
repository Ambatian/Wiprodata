using EmployeeManagementSystem.Dtos;
using EmployeeManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagementSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;
    public AuthController(IAuthService auth) { _auth = auth; }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var res = await _auth.LoginAsync(dto.Email, dto.Password);
        if (res is null) return Unauthorized(new { message = "Invalid credentials" });
        return Ok(new { token = res.Token, user = new { id = res.User.UserId, email = res.User.Email, role = res.User.Role?.RoleName } });
    }

    // Only HR can register new users/employees
    [HttpPost("register")]
    [Authorize(Roles = "HR")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var ok = await _auth.RegisterAsync(dto);
        if (!ok) return BadRequest(new { message = "User already exists" });
        return Ok(new { message = "Registration successful" });
    }
}
