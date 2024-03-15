using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using API.Extensions;
using System.Security.Claims;
using API.Entities;
// using System.Web.Mvc;
// using Microsoft.AspNetCore.Identity;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    // private readonly IPhoto _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUserRepository userRepository, 
        IMapper mapper, IPhotoService photoService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _photoService = photoService;
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

        // var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        // var claimsIdentity = (ClaimsIdentity)User.Identity;
        // var nameIdentifierClaim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
        // var username = nameIdentifierClaim.Value;
        // Console.WriteLine(username);
        // Console.WriteLine(username);

        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        if (user == null) return NotFound();

        _mapper.Map(memberUpdateDto, user);

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> UploadPhoto(IFormFile file)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
        if (user == null) return NotFound();

        var result = await _photoService.UploadPhotoAsync(file);
        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };
        if (user.Photos.Count == 0) photo.IsMain = true;

        user.Photos.Add(photo);
        if (await _userRepository.SaveAllAsync()) return _mapper.Map<PhotoDto>(photo);

        return BadRequest("Problem adding photo");
    }

    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
        if (user == null) return NotFound();

        var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
        if (photo == null) return NotFound();
        if (photo.IsMain) return BadRequest("Already main photo");

        var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);
        if (currentMain != null) currentMain.IsMain = false;

        photo.IsMain = true;
        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problem setting the main photo");
    }
    
    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> RemovePhoto(int photoId)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
        if (user == null) return NotFound();

        var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);
        if (photo.IsMain) return BadRequest("Cannot delete main photo");
        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        user.Photos.Remove(photo);
        if (await _userRepository.SaveAllAsync()) return Ok();

        return BadRequest("Problem deleting photo");
    }

}
