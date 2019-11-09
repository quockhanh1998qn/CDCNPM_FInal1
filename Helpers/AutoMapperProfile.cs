using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CDCNPM_FInal.Dtos;
using CDCNPM_FInal.Models;

namespace CDCNPM_FInal.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
