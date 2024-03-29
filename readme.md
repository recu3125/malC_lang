# <a href = "https://recu3125.github.io/malC_lang/">> 말씨 <</a>
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Frecu3125%2FmalC_lang&count_bg=%234E7BBA&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)<br>
순수 한국어/한글 프로그래밍 언어 말씨입니다!<br>
왼쪽의 칸에 코딩하고 실행 버튼을 눌러 출력값을 확인할 수 있습니다.
링크에 들어가서 하단 예제 코드를 붙여넣기해보세요!
<br>
### 몇 가지 기본 규칙들 
- 코드에는 한글과 띄어쓰기만 사용한다
- 코드가 한국어 문법적으로 올바르게 되도록 한다
- 코드는 ~라면 ~하고 ~한다 체로 작성된다
- 단순한 어투 변화(같다면/같으면, 정한다/둔다/바꾼다 등) 는 되도록 사용할 수 있도록 한다
<br>
<br>

오류, 버그가 있거나, 뜻하는 바는 같은 비슷한 문장인데 조사 차이 등으로 인식되지 않는 코드가 있다면,
<br>아니면 코드에서 오류가 나는데 어떤 오류인지 모르겠다면
<br>이슈 만들어주시거나 superhoy0509@gmail.com 으로 가볍게 질문/제보해 주시기 바랍니다!
<br>
<br>

### 문법
문법 탭보단 예제를 복붙해 보는게 더 쉬울 수도 있어요!
<details>
<summary>문법 토글 (클릭!) </summary>
<div markdown="1">
<pre>

<b>1.변수와 숫자 쓰기</b>
변수와 숫자는 변수 (변수이름), 숫자 (한글 숫자)
으로 작성하되, 뒤에 한 칸을 띄어 쓴다
예시) 변수 가나다 를 숫자 이백삼십 으로 정한다

<b>2.정의와 값 저장</b>
아래와 같이 작성한다.
변수 어쩌구 를 정의한다/생성한다/만든다/선언한다 (정의)
변수 어쩌구 를 숫자 몇 으로 정의한다/생성한다/선언한다 (정의와 함께 값 저장)
변수 어쩌구 를 숫자 몇/변수 저쩌구 으로 정한다/만든다/둔다/바꾼다/설정한다 (값 저장)
변수 어쩌구 를 변수 저쩌구 와 같게 한다 (값 다른 변수와 같게 저장)

<b>3.사칙연산과 괄호</b>
아래와 같이 작성한다.
변수 어쩌구 에 숫자 몇/변수 어쩌구 를 더한다/뺀다/곱한다/나눈다
뭔가 와 뭔가 의 합/곱 (괄호 대신 사용할 수 있음)
뭔가 더하기/빼기... 뭔가
ex) 변수 가 빼기 변수 나 와 변수 다 나누기 변수 라 의 합
(변수가빼기변수나 와 변수다나누기변수라 의 합 으로 인식됨)

<b>4.입력과 출력</b>
아래와 같이 작성한다.
출력할텍스트 라고 출력한다 (텍스트 출력)
변수 어쩌구 를 출력한다 (변수 출력)
줄을 바꾼다 (줄바꿈 출력)

변수 어쩌구 를/에 입력받는다 (변수 입력)
질문할텍스트 라고 물어보며 변수 어쩌구 를/에 입력받는다 (질문과 함꼐 변수 입력)
변수 어쩌구 를/에 질문할텍스트 라고 물어보며 입력받는다 (위와 같음)

<b>5.연결과 다중 구문</b>
조건문이나 반복문 이후 실행할 것들이 여러 개라면
~하고   ~하고   ...  로 연결한다
~한다 를 쓰면 조건문,반복문들 중 하나를 탈출한다
ex)
-한다면/인 동안
-하고
-하고
-한다

다중 구문은 -하고 이후에 또 조건문이나 반복문을 넣으면 된다
ex)
-인 동안  //{
-하고
-하고
-인 동안  //{
-하고
-한다     //}
-한다     //}

인덴트 등 가독성 향상을 위한 방법 고려중

<b>6.조건문</b>
아래와 같이 작성한다.
만약 뭐 와 뭐 가 같다면/같으면/다르다면/다르면/같지 않......
만약 뭐 가 뭐 보다 크다면/작다면/크면/크지 않다면/크거나 같다면...
아니고 만약 .......
아니라면
(만약 없이도 가능)

<b>7.반복문</b>
아래와 같이 작성한다.
뭐 와 뭐 가 같은 동안
뭐 가 뭐 보다 큰 동안 ..etc

<b>8.배열</b>
정의와 원소 값 저장은 변수와 같이 한다.

배열 어쩌구 의 몇 번째/번/째 원소
를 통해 원소를 불러올 수 있다.
ex) 배열 가나다 의 이백아흔아홉 째 원소
    배열 가나다 의 이백구십구 번 원소
    배열 가나다 의 이억삼천만 번째 원소

위를 종합해 배열 가나다 의 세 번째 원소 를 숫자 삼 으로 둔다
처럼 사용할 수 있다.

</pre>
</div>
</details>

<br>
<br>
<br>

### 예제 (한번에 다 복사해가셔도 작동해요!)
<pre>
기본 연산 사용법 이라고 출력한다
줄을 바꾼다
변수 하나 를 숫자 이 로 정의한다
변수 삼 을 숫자 육 으로 정의한다
변수 둘 을 숫자 백이십삼 으로 정의한다
변수 하나 를 숫자 백억 으로 바꾼다
변수 하나 와 변수 둘 의 합 과 변수 둘 과 변수 삼 의 곱 의 합 을 출력한다
줄을 바꾼다
만약 숫자 백 빼기 숫자 구십사 가 변수 삼 과 같다면
안녕 세상아! 라고 출력하고
변수 하나 를 숫자 이 로 바꾸고
줄을 바꾸고
변수 하나 를 출력한다
</pre>


<pre>
입력받기 사용법 이라고 출력한다
줄을 바꾼다
변수 키 를 만든다
변수 희망키 를 만든다
현재 키가 무엇인가요? 라고 물어보며 변수 키 를 입력받는다
변수 희망키 를 되고싶은 키는 무엇인가요? 라고 물어보며 입력받는다
만약 변수 키 가 변수 희망키 와 같다면
이미 원하는 키를 가지고 계시는군요! 라고 출력한다
아닌데 만약 변수 키 가 변수 희망키 보다 작다면
저도 키 컸으면 좋겠어요 라고 출력하고
줄을 바꾸고
흐엉 이라고 출력한다
아니라면
키가 작아지고 싶다니 특이 케이스군요 라고 출력한다
</pre>

<pre>
반복문 사용법 이라고 출력한다
줄을 바꾼다
변수 기역 을 생성한다
변수 기역 을 숫자 십삼 으로 둔다
변수 기역 이 숫자 일 보다 큰 동안
변수 기역 에서 숫자 일 을 빼고
로켓발사  라고 출력하고
변수 기역 을 출력하고
초 전 이라고 출력하고
줄을 바꾼다
만약 변수 기역 이 숫자 영 보다 작다면
발사! 라고 출력한다
만약 변수 기역 이 숫자 일 과 같다면
우와아 발사! 라고 출력하고
줄을 바꾼다
푸쉬이이이이긱기쿠와아앙아앙아 이라고 출력한다
</pre>

<pre>
다중 반복문 사용법! 국룰은 구구단 출력이지 이라고 출력한다
줄을 바꾼다
한다 와 하고 의 차이를 잘 보세요! 라고 출력한다
줄을 바꾼다
줄을 바꾼다
변수 아 를 숫자 일 으로 정의한다
변수 자 를 숫자 일 으로 정의한다
변수 아 가 숫자 구 보다 작은 동안
변수 아 에 숫자 일 을 더하고
변수 자 를 숫자 일 으로 정하고
변수 자 가 숫자 구 보다 작은 동안
변수 자 에 숫자 일 을 더하고
변수 아 를 출력하고
 곱하기  라고 출력하고
변수 자 를 출력하고
 는  라고 출력하고
변수 아 와 변수 자 의 곱 을 출력하고
줄을 바꾼다
줄을 바꾼다
</pre>

<pre>
배열만드는법은 피보나치 수열로! 라고 출력한다
줄을 바꾼다

배열 가 를 선언한다
배열 가 의 첫 번째 원소 를 숫자 영 으로 만든다
배열 가 의 두 번째 원소 를 숫자 일 으로 만든다
변수 아 를 숫자 삼 으로 생성한다
변수 아 가 숫자 오십 보다 작은 동안
배열 가 의 변수 아 번째 원소 를 배열 가 의 변수 아 빼기 숫자 일 번째 원소 더하기 배열 가 의 변수 아 빼기 숫자 이 번째 원소 로 정하고
변수 아 에 숫자 일 을 더한다

변수 아 를 숫자 일 로 정한다
변수 아 가 숫자 오십 보다 작은 동안
배열 가 의 변수 아 번째 원소 를 출력하고
변수 아 에 숫자 일 을 더하고
줄을 바꾼다
</pre>
