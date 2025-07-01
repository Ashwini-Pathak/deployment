import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';
import { PreferenceTypeDto } from './dto/list-preference.dto';

@Controller({
  path: 'user/:id/preferences',
  version: '2',
})
@UseGuards(JwtAuthGuard)
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto, @Param('id') userId) {
    return this.preferencesService.createPreference(userId, createPreferenceDto);
  }

  @Get()
  async findUserPreference(@Param('id') userId) {
    const data = await this.preferencesService.findUserPreference(userId);

    return {
      message: 'Fetched preference',
      data,
    };
  }

  @Get('list')
  getPreferenceList(@Query() preferenceType: PreferenceTypeDto) {
    return this.preferencesService.getPreferenceList(preferenceType);
  }
}
