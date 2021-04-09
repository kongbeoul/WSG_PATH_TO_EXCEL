# WSG_PATH_TO_EXCEL

## DESCRIPTION
WSG_PATH의 데이터 구조를 기반으로 작업된 화면 목록을 액셀로 변환하는 파일입니다.

**데이터구조**
아래와 같이 데이터 구조를 변경한 후 액셀파일 생성
```json
{
    "_depID": "1",
    "title": "제목",
    "url": "링크",
    "state": "작업 상태",
    "history": {
        "YYYY-MM-DD": ["변경사항"]
    },
    "children": []
}
```
```json
{
    "menu": "메뉴명",
    "title": "제목",
    "url": "링크",
    "state": "작업 상태"
}
```

MENU|TITLE|URL|STATE|   
:---:|:---:|:---:|:---:
||1depth menu_01|||
guide|1depth menu_01 > 2depth menu|/guide.html|완료
guide|1depth menu_01 > 2depth menu |/guide.html|예정	
guide|1depth menu_01 > 2depth menu > 3depth menu|/guide.html|진행중
guide|1depth menu_01 > 2depth menu > 3depth menu > 4depth menu|/guide.html|삭제
||1depth menu_02|||
guide|1depth menu_01 > 2depth menu|/guide.html|완료