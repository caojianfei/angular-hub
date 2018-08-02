import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticlesService } from '../apis/articles.service';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';
import { Article } from '../apis/models/responses/article';


@Injectable({
    providedIn: 'root'
})
export class UpdateArticleGuard implements CanActivate {

    constructor(private articleService: ArticlesService, private authService: AuthService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let loginedUser = this.authService.loginedUser;
        return this.articleService.getArticle(next.params.id).pipe(
            switchMap(
                (article: Article) => {
                    if (article.user_id !== loginedUser.id) {
                        this.router.navigate(['../']);
                    }
                    return of(article.user_id === loginedUser.id)
                }
            )
        )
    }
}
