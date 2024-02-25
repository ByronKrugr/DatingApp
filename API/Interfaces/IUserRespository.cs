using API.Entities;
using API.DTOs;
using System.Collections.Generic;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync(AppUser user);
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser> GetUserByIdAsync(int id);
    Task<AppUser> GetUserByUsernameAsync(string username);
    Task<MemberDto> GetMemberByUsernameAsync(string username);
    Task<IEnumerable<MemberDto>> GetMembersAsync();
}
