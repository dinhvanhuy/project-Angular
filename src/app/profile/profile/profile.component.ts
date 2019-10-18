import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';
import { Profile } from '../../models/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/services/confirm.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	public articlesCount: number;
	public currentPage: number;
	public isView = false;
	private userName: string;
	public profile: { bio?: number; following: any; image?: string; username?: string; };
	public follow: string;

	constructor(
		private userService: UserService,
		private router: ActivatedRoute,
		private route: Router,
		private confirmService: ConfirmService,
		private location: Location
	) { }

	ngOnInit() {
		this.router.params.subscribe(({ userName }) => {
			this.userName = this.removeFirst(userName);
			if (this.userName === localStorage.getItem('username')) {
				this.isView = true;
			}
			this.userService.getUserDetail(this.userName)
				.subscribe((profile: Profile) => {
					this.profile = profile.profile;
					this.follow = this.profile.following ? 'Unfollow' : 'Follow';
				}, (error) => {
					console.log('This user does not exist');
					this.location.back();
					return this.confirmService.alert('This user does not exist');
				});
		});
	}

	removeFirst(params: string) {
		return params.replace('@', '').trim();
	}

	updateFollow(following: boolean) {
		if (localStorage.getItem('token') == null || localStorage.getItem('token') === '') {
			return this.route.navigate(['/login']);
		}

		this.profile.following = !following;
		this.follow = !following ? 'Unfollow' : 'Follow';
		this.profile.following ?
			this.userService.followUser(this.userName).subscribe() :
			this.userService.unfollowUser(this.userName).subscribe();
	}

	getSetting() {
		this.route.navigate(['/settings']);
	}

	getArticlesCount(articlesCount: number) {
		this.articlesCount = articlesCount;
	}

	getCurrentPage(currentPage: number) {
		this.currentPage = currentPage;
	}

}
