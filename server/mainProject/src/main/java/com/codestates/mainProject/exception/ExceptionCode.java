package com.codestates.mainProject.exception;

import lombok.Getter;

public enum ExceptionCode {

    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    MEMBER_EXISTS(409, "회원이 존재합니다."),
    MEMBER_IS_DELETED(404, "탈퇴한 회원입니다"),

    MUSIC_NOT_FOUND(404, "음악을 찾을 수 없습니다"),

    MUSIC_LIKE_NOT_FOUND(404, "음악 추천을 찾을 수 없습니다"),

    PLAYLIST_NOT_FOUND(404, "플레이리스트를 찾을 수 없습니다"),
    PlAYLIST_LIKE_NOT_FOUND(404, "플레이리스트 추천을 찾을 수 없습니다"),
    NO_PERMISSION_EDITING_POST(403,"작성자만 수정할 수 있습니다."),
    NO_PERMISSION_DELETING_POST(403,"작성자만 삭제할 수 있습니다."),
    NO_PERMISSION_CREATING_POST(403, "회원만 작성 할 수 있습니다."),
    INTERNAL_SERVER_ERROR(500, "인터넷 서버 오류입니다");
    @Getter
    private int status;

    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}