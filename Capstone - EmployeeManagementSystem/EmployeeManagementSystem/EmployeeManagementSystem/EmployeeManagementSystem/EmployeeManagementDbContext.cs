using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementSystem;
public class EmployeeManagementDbContext : DbContext
{
    public EmployeeManagementDbContext(DbContextOptions<EmployeeManagementDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<LeaveRequest> LeaveRequests => Set<LeaveRequest>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>().HasData(
       new Role { RoleId = 1, RoleName = "HR" },
       new Role { RoleId = 2, RoleName = "Manager" },
       new Role { RoleId = 3, RoleName = "Employee" }
   );

        // Seed Departments
        modelBuilder.Entity<Department>().HasData(
            new Department { DepartmentId = 1, Name = "Engineering" },
            new Department { DepartmentId = 2, Name = "Sales" },
            new Department { DepartmentId = 3, Name = "HR" }
        );

        // Seed Users
        modelBuilder.Entity<User>().HasData(
            new User { UserId = 1, Email = "anusha3002@gmail.com", PasswordHash = "Anushsa123", RoleId = 1, CreatedAt = DateTime.UtcNow },
            new User { UserId = 2, Email = "rajkollu123@gmail.com", PasswordHash = "Rajkollu", RoleId = 2, CreatedAt = DateTime.UtcNow },
            new User { UserId = 3, Email = "Aniravi123@gmail.com", PasswordHash = "Aniravi123", RoleId = 3, CreatedAt = DateTime.UtcNow }
        );

        // Seed Employees linked to Users
        modelBuilder.Entity<Employee>().HasData(
            new Employee { EmployeeId = 1, UserId = 1, FirstName = "Hema", LastName = "charan", JobTitle = "HR Lead", DepartmentId = 3, HireDate = DateTime.UtcNow },
            new Employee { EmployeeId = 2, UserId = 2, FirstName = "Anudeep", LastName = "Raghav", JobTitle = "Team Lead", DepartmentId = 1, HireDate = DateTime.UtcNow },
            new Employee { EmployeeId = 3, UserId = 3, FirstName = "Anil", LastName = "Kumar", JobTitle = "Developer", DepartmentId = 1, HireDate = DateTime.UtcNow, ManagerId = 2 }
        );

        // Enforce unique Email
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // Relationships
        modelBuilder.Entity<User>()
            .HasOne(u => u.Employee)
            .WithOne(e => e.User!)
            .HasForeignKey<Employee>(e => e.UserId);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Manager)
            .WithMany()
            .HasForeignKey(e => e.ManagerId)
            .OnDelete(DeleteBehavior.NoAction);

        base.OnModelCreating(modelBuilder);
    }
}
