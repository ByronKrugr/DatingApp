using API.Entities;
using API.Data;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
// using System.Web.Mvc;
// using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await _userRepository.GetMembersAsync();
        return Ok(users);
    }

    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        return await _userRepository.GetMemberByUsernameAsync(username);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateMemberDetails(MemberUpdateDto memberUpdateDto)
    {
        // foreach (var claim in User.Claims)
        // {
        //     Console.WriteLine(claim.Value);
        // }

        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // var claimsIdentity = (ClaimsIdentity)User.Identity;
        // var nameIdentifierClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
        // var username = nameIdentifierClaim.Value;
        // Console.WriteLine(username);
        // Console.WriteLine(username);

        var user = await _userRepository.GetUserByUsernameAsync(username);

        if (user == null) return NotFound();

        _mapper.Map(memberUpdateDto, user);

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }
}
