import { Controller, Post, Body, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from '../announcements/announcements.service';
import { AnnouncementDto } from '../announcements/dto/announcement.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationDto } from '../notifications/dto/notification.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { AdminRoleGuard } from '../auth/guards/role.guard';
// import { Roles } from '../auth/decorator/roles.decorator';
// import { Role } from '../auth/enum/role.enum';

@Controller('admin/:id')
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class AdminController {
  constructor(
    private announcementsService: AnnouncementsService,
    private notificationService: NotificationsService,
  ) {}

  // @Roles(Role.Admin)
  @Post('/announcement')
  createAnnouncement(@Body() announcementDto: AnnouncementDto) {
    return this.announcementsService.createAnnouncement(announcementDto);
  }

  @Get('/announcements')
  getAnnouncements() {
    return this.announcementsService.getAllAnnouncements();
  }

  @Get('/announcements/:announcementId')
  getAnnouncementById(@Param('announcementId') id: string) {
    return this.announcementsService.getAnnouncementById(id);
  }

  @Put('/announcements/:announcementId')
  updateAnnouncement(@Param('announcementId') id: string, @Body() announcementDto: AnnouncementDto) {
    return this.announcementsService.updateAnnouncement(id, announcementDto);
  }

  // NOTIFICATIONS
  @Post('/notification')
  createNotification(@Body() notification: NotificationDto) {
    return this.notificationService.createNotification(notification);
  }
}
