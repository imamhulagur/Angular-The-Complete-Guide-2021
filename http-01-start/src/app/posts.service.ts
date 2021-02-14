import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from 'rxjs/operators'
import { Subject, throwError } from "rxjs";


@Injectable({
    providedIn: 'root'//modern approach, instead of declaring inside provider[] in app.module.ts 
})
export class PostsServices {
    errorMessage = new Subject<string>();
    //in this service i will have my HTTP request methods and i only want get the responses/messages whether we are done with request or not in front end.
    constructor(private http: HttpClient) {}
    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        this.http.post<{name: string}>('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json', postData, 
            {
                observe: 'response'
            }
        )
        .subscribe(responseData => {
        console.log(responseData);
        }, error=> {
            this.errorMessage.next(error.message);//here we simple get that error message and pass it on
        });
    }

    fetchPosts() {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('pretty', 'print');
        searchParams = searchParams.append('test', 'temp');

        return this.http.get<{[key: string]: Post}>('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json', {
            headers:new HttpHeaders({
                'Custom-Header': 'Hello'
            }),
            params: searchParams
        })
        .pipe(
            map((responseData) => {
                const postsArray: Post[] = [];
                //to cover JS object to new Array we need to loop through array
                for(const key in responseData) {
                    if(responseData.hasOwnProperty(key)) {
                        postsArray.push({...responseData[key], id: key});
                    }
                }
                return postsArray;
            }),
            catchError(errorRes => {
                //send to analytics service to keep track of  front end logs, to do behind the scenes when a error occurred
                return throwError(errorRes);
            })
        )
        // .subscribe(posts=> {
        // });
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-imam-default-rtdb.firebaseio.com/post.json',
            {
                observe: 'events',
                responseType: 'text'
            }
        ).pipe(tap(event=> {
            console.log(event);
            if(event.type === HttpEventType.Response) {
                console.log('request was sent, waiting for response...')
            }
        }));
    }

}