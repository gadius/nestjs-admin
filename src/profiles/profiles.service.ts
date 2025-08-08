import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Profile | null> {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto
  ): Promise<Profile | null> {
    await this.profileRepository.update(id, updateProfileDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
