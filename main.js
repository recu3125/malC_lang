function convert() {
  input = document.getElementsByClassName("hwt-highlights hwt-content")[0].innertext || document.getElementsByClassName("hwt-highlights hwt-content")[0].textContent

  // 변수  (korvar[_0-9]+) 
  // ([0-9\+\-\*/_korvar\(\)]+) 

  //변수빼놓기
  function varreplacer(match, p1, offset, string) {
    p1 = p1.split('')
    return ('korvar_' + (p1.map(x => x.charCodeAt(0).toString())).join('_'))
  }
  input = input.replace(/변수 ([가-힣]+)/g, varreplacer)

  function numreplacer(match, p1, offset, string) {
    kornum = p1.split('')
    if (kornum == ['영']) {
      return '0'
    }
    res = 0
    kor1 = ['일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
    kor2 = ['십', '백', '천']
    kor3 = ['만', '억', '조']
    len = kornum.length
    one = 0
    for (i = 0; i < len; i++) {
      if (kor2.indexOf(kornum[i]) != -1) {
        if (one == 0) res += Math.pow(10, kor2.indexOf(kornum[i]) + 1)
        else res += one * Math.pow(10, kor2.indexOf(kornum[i]) + 1)
      }
      if (kor3.indexOf(kornum[i]) != -1) {
        res += one
        res *= Math.pow(10000, kor3.indexOf(kornum[i]) + 1)
      }
      if (kor1.indexOf(kornum[i]) != -1) {
        one = kor1.indexOf(kornum[i]) + 1
      }
      else {
        one = 0
      }
    }
    return (res + one).toString()
  }
  input = input.replace(/숫자 ([가-힣]+)/g, numreplacer)
  input = input.replace(/숫자 ([영일이삼사오육칠팔구십백천만억조]+) /g, numreplacer)


  //basic +-*/
  let preinput
  while (input != preinput) {
    preinput = input
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) 더하기 ([0-9\+\-\*/_korvar\(\)]+) /g, '$1+$2 ')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) 빼기 ([0-9\+\-\*/_korvar\(\)]+) /g, '$1-$2 ')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) 곱하기 ([0-9\+\-\*/_korvar\(\)]+) /g, '$1*$2 ')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) 나누기 ([0-9\+\-\*/_korvar\(\)]+) /g, '$1/$2 ')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (와|과|에)(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 더한 (거|것)/g, '($1+$6)')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (와|과|에)(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) 의 합/g, '($1+$6)')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (와|과|에)(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 뺀 (거|것)/g, '($1+$6)')
    //TODO 차, 절댓값 등 함수
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (와|과|에)(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 곱한 (거|것)/g, '($1+$6)')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (와|과|에)(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) 의 곱/g, '($1*$6)')
    input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (와|과|에)(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를|로|으로) 나눈 (거|것)/g, '($1+$6)')
  }
  //if
  input = input.replace(/만약에 */g, '')
  input = input.replace(/만약 */g, '')
  input = input.replace(/그것도 */g, '')

  //else if
  //같다
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가|와|과) ([0-9\+\-\*/_korvar\(\)]+) ( 이|이|가| 가|와|과) (똑|)같(다|으)면/g, 'else if ($2 == $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) (| 이|이)라면/g, 'else if ($2 == $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가|와|과) ([0-9\+\-\*/_korvar\(\)]+) ( 이|이|가| 가|와|과) (다르|같지 않)(다|으)면/g, 'else if ($2 != $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) (| 이|이)아니(|라)면/g, 'else if ($2 != $4){}')

  //부등식
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크(다|)면/g, 'else if ($2 > $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작(다|)면/g, 'else if ($2 < $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크지 않(다|으)면/g, 'else if ($2 <= $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작지 않(다|으)면/g, 'else if ($2 >= $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크거나 같(다|)면/g, 'else if ($2 >= $4){}')
  input = input.replace(/(아닌데|아니고|아니면서) ([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작거나 같(다|)면/g, 'else if ($2 <= $4){}')

  //if
  //같다
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가|와|과) ([0-9\+\-\*/_korvar\(\)]+) ( 이|이|가| 가|와|과) (똑|)같(다|으)면/g, 'if ($1 == $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) (| 이|이)라면/g, 'if ($1 == $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가|와|과) ([0-9\+\-\*/_korvar\(\)]+) ( 이|이|가| 가|와|과) (다르|같지 않)(다|으)면/g, 'if ($1 != $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) (| 이|이)아니(|라)면/g, 'if ($1 != $3){}')

  //부등식
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크(다|)면/g, 'if ($1 > $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작(다|)면/g, 'if ($1 < $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크지 않(다|으)면/g, 'if ($1 <= $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작지 않(다|으)면/g, 'if ($1 >= $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크거나 같(다|)면/g, 'if ($1 >= $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작거나 같(다|)면/g, 'if ($1 <= $3){}')


  //else
  input = input.replace(/아니라면/g, 'else{}')

  //while
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가|와|과) ([0-9\+\-\*/_korvar\(\)]+) ( 이|이|가| 가|와|과) (똑|)같은 동안/g, 'while ($1 == $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) (| 인|인) 동안/g, 'while ($1 == $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가|와|과) ([0-9\+\-\*/_korvar\(\)]+) ( 이|이|가| 가|와|과) (다른|같지 않은) 동안/g, 'while ($1 != $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) (| 이|이)아닌 동안/g, 'while ($1 != $3){}')
  //부등식
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)큰 동안/g, 'while ($1 > $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작은 동안/g, 'while ($1 < $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크지 않은 동안/g, 'while ($1 <= $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작지 않은 동안/g, 'while ($1 >= $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)크거나 같은 동안/g, 'while ($1 >= $3){}')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (이|가) ([0-9\+\-\*/_korvar\(\)]+) 보다 (더 |)작거나 같은 동안/g, 'while ($1 <= $3){}')

  preinput = ''
  while (input != preinput) {
    preinput = input
    //중괄호 끝맺음
    //var
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) (만든다|정의한다|생성한다)/g, '\nvar $1} ')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 으로 (정의한다|생성한다)/g, '\nvar $1 = $3} ')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 로 (정의한다|생성한다)/g, '\nvar $1 = $3} ')
    //set
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 으로 (정한다|만든다|둔다|바꾼다|설정한다)/g, '\n$1 = $3} ')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 로 (정한다|만든다|둔다|바꾼다|설정한다)/g, '\n$1 = $3} ')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) (와|과) (같게 한다)/g, '\n$1 = $3} ')
    //+=, ++,...
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 더한다/g, '\n$1+=$5} ')
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 뺀다/g, '\n$1-=$5} ')
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 곱한다/g, '\n$1*=$5} ')
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를|으로|로) 나눈다/g, '\n$1/=$5} ')
    //출력
    input = input.replace(/}\n([가-힣 !?,.]+) 이라고 출력한다/g, '\ndocument.getElementById(\'out\').value += \'$1\'} ')
    input = input.replace(/}\n([가-힣 !?,.]+) 이라 출력한다/g, '\ndocument.getElementById(\'out\').value += \'$1\'} ')
    input = input.replace(/}\n([가-힣 !?,.]+) 라고 출력한다/g, '\ndocument.getElementById(\'out\').value += \'$1\'} ')
    input = input.replace(/}\n([가-힣 !?,.]+) 라 출력한다/g, '\ndocument.getElementById(\'out\').value += \'$1\'} ')
    input = input.replace(/}\n([가-힣 !?,.]+) 고 출력한다/g, '\ndocument.getElementById(\'out\').value += \'$1\'} ')
    input = input.replace(/}\n([0-9\+\-\*/_korvar\(\)]+) (을|를) 출력한다/g, '\ndocument.getElementById(\'out\').value += $1.toString()} ')
    input = input.replace(/}\n줄( |)을 바꾼다/g, '\ndocument.getElementById(\'out\').value += \'\\n\'} ')
    //입력
    input = input.replace(/}\n(korvar[_0-9]+) (을|를|에)(다|)(가|) ([가-힣 !?,.]+) (라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어) 입력(을 |)받는다/g, '\n$1 = prompt("$5", "")*1} ')
    input = input.replace(/}\n([가-힣 !?,.]+) (라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어) (korvar[_0-9]+) (을|를|에)(다|)(가|) 입력(을 |)받는다/g, '\n$3 = prompt("$1", "")*1} ')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를|에)(다|)(가|) 입력(을 |)받는다/g, '\n$1 = prompt("입력 : ", "")*1} ')

    //중괄호 연장
    //var
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) (만들고|정의하고|생성하고)/g, '\nvar $1}')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 으로 (정의하고|생성하고)/g, '\nvar $1 = $3}')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 로 (정의하고|생성하고)/g, '\nvar $1 = $3}')
    //set
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 으로 (정하고|만들고|두고|바꾸고|설정하고)/g, '\n$1 = $3}')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 로 (정하고|만들고|두고|바꾸고|설정하고)/g, '\n$1 = $3}')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) (와|과) (같게 하고)/g, '\n$1 = $3}')
    //+=, ++,...
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 더하고/g, '\n$1+=$5}')
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 빼고/g, '\n$1-=$5}')
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 곱하고/g, '\n$1*=$5}')
    input = input.replace(/}\n(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를|으로|로) 나누고/g, '\n$1/=$5}')
    //출력
    input = input.replace(/}\n([가-힣 !?,.]+) 이라고 출력하고/g, '\ndocument.getElementById(\'out\').value += \'$1\'}')
    input = input.replace(/}\n([가-힣 !?,.]+) 이라 출력하고/g, '\ndocument.getElementById(\'out\').value += \'$1\'}')
    input = input.replace(/}\n([가-힣 !?,.]+) 라고 출력하고/g, '\ndocument.getElementById(\'out\').value += \'$1\'}')
    input = input.replace(/}\n([가-힣 !?,.]+) 라 출력하고/g, '\ndocument.getElementById(\'out\').value += \'$1\'}')
    input = input.replace(/}\n([가-힣 !?,.]+) 고 출력하고/g, '\ndocument.getElementById(\'out\').value += \'$1\'}')
    input = input.replace(/}\n([0-9\+\-\*/_korvar\(\)]+) (을|를) 출력하고/g, '\ndocument.getElementById(\'out\').value += $1.toString()}')
    input = input.replace(/}\n줄( |)을 바꾸고/g, '\ndocument.getElementById(\'out\').value += \'\\n\'}')
    //입력
    input = input.replace(/}\n(korvar[_0-9]+) (을|를|에)(다|)(가|) ([가-힣 !?,.]+) (라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어) 입력(을 |)받고/g, '\n$1 = prompt("$5", "")*1}')
    input = input.replace(/}\n([가-힣 !?,.]+) (라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어) (korvar[_0-9]+) (을|를|에)(다|)(가|) 입력(을 |)받고/g, '\n$3 = prompt("$1", "")*1}')
    input = input.replace(/}\n(korvar[_0-9]+) (을|를|에)(다|)(가|) 입력(을 |)받고/g, '\n$1 = prompt("입력 : ", "")*1}')
  }
  //중괄호 없음
  //var
  input = input.replace(/(korvar[_0-9]+) (을|를) (만든다|정의한다|생성한다)/g, 'var $1')
  input = input.replace(/(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 으로 (정의한다|생성한다)/g, 'var $1 = $3')
  input = input.replace(/(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 로 (정의한다|생성한다)/g, 'var $1 = $3')
  //set
  input = input.replace(/(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 으로 (정한다|만든다|둔다|바꾼다|설정한다)/g, '$1 = $3')
  input = input.replace(/(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) 로 (정한다|만든다|둔다|바꾼다|설정한다)/g, '$1 = $3')
  input = input.replace(/(korvar[_0-9]+) (을|를) ([0-9\+\-\*/_korvar\(\)]+) (와|과) (같게 한다)/g, '$1 = $3')
  //+=, ++,...
  input = input.replace(/(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 더한다/g, '$1+=$5')
  input = input.replace(/(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 뺀다/g, '$1-=$5')
  input = input.replace(/(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를) 곱한다/g, '$1*=$5')
  input = input.replace(/(korvar[_0-9]+) 에(서|)(다가|)(다|) ([0-9\+\-\*/_korvar\(\)]+) (을|를|으로|로) 나눈다/g, '$1/=$5')
  //출력
  input = input.replace(/([가-힣 !?,.]+) 이라고 출력한다/g, 'document.getElementById(\'out\').value += \'$1\'')
  input = input.replace(/([가-힣 !?,.]+) 이라 출력한다/g, 'document.getElementById(\'out\').value += \'$1\'')
  input = input.replace(/([가-힣 !?,.]+) 라고 출력한다/g, 'document.getElementById(\'out\').value += \'$1\'')
  input = input.replace(/([가-힣 !?,.]+) 라 출력한다/g, 'document.getElementById(\'out\').value += \'$1\'')
  input = input.replace(/([가-힣 !?,.]+) 고 출력한다/g, 'document.getElementById(\'out\').value += \'$1\'')
  input = input.replace(/([0-9\+\-\*/_korvar\(\)]+) (을|를) 출력한다/g, 'document.getElementById(\'out\').value += $1.toString()')
  input = input.replace(/줄( |)을 바꾼다/g, 'document.getElementById(\'out\').value += \'\\n\'')

  //입력
  input = input.replace(/(korvar[_0-9]+) (을|를|에)(다|)(가|) ([가-힣 !?,.]+) (라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어) 입력(을 |)받는다/g, '$1 = prompt("$5", "")*1')
  input = input.replace(/([가-힣 !?,.]+) (라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어) (korvar[_0-9]+) (을|를|에)(다|)(가|) 입력(을 |)받는다/g, '$3 = prompt("$1", "")*1')
  input = input.replace(/(korvar[_0-9]+) (을|를|에)(다|)(가|) 입력(을 |)받는다/g, '$1 = prompt("입력 : ", "")*1')





  //string

  return input
}

function run() {
  if (!haserror) {
    document.getElementById('out').value = ''
    try {
      eval(convert());
    } catch (e) {
      output = ''
      function errreplacer(match, p1, offset, string) {
        p1 = p1.split('_').slice(1)
        return ('변수 ' + p1.map(x => String.fromCharCode(x)).join('').toString() + '가 정의되지 않았습니다!')
      }
      output = e.message.toString().replace(/korvar(.+) is not defined/g, errreplacer)
      document.getElementById('out').value = output
    }
  }
}
var errlines = []
var noerrlines = []
function loaded() {
  $('#in').highlightWithinTextarea({
    highlight: [
      {
        highlight: [/변수 [가-힣]+ /g, /숫자 [가-힣]+ /g],
        className: 'varornum'
      },
      {
        highlight: [/[가-힣]+다$/mg, /[가-힣]+고$/mg],
        className: 'pink'
      },
      {
        highlight: /[가-힣 !?,.]+(면|동안)$/gm,
        className: 'ifwhile'
      },
      {
        highlight: [/^[가-힣 !?,.]+ (?=((이|)라고) 출력)/mg,
          /^((?!변수 [가-힣]+).)+ [가-힣 !?,.]* (?=(라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어))/mg,
          /(?<=(을|를|에)[가-힣]* )[가-힣 !?,.]+ (?=(라며|라면서|라고 하며|라고 하면서|라고 물어보고|라고 물어보며|하고 물어보고|하고 물어보며|하고 물어|라고 물어))/mg],
        className: 'string'
      },
      {
        highlight: errlinecheck,
        className: 'err'
      },
      {
        highlight: /^[가-힣ㄱ-ㅎㅏ-ㅣ !?,.]+$/gm,
        className: 'green'
      }
    ]
  });

}

var haserror = false
function livecheck() {
  $('#in').highlightWithinTextarea('update');
  document.getElementById('run').innerHTML = '실행!'
  document.getElementById('run').style.color = '#00b57e'
  document.getElementById('run').style.outline = '2px dotted #00b57e'
  haserror = false
  let code = convert()
  let input = document.getElementsByClassName("hwt-highlights hwt-content")[0].innertext || document.getElementsByClassName("hwt-highlights hwt-content")[0].textContent
  byline2 = input.split('\n')
  for (i = 0; i < byline2.length; i++) {
    if (/[^ 가-힣\?!\.,\n]/.test(byline2[i])) {
      document.getElementById('run').innerHTML = (i + 1).toString() + '번째 줄이 문법에 어긋납니다..'
      document.getElementById('run').style.color = '#FF8888'
      document.getElementById('run').style.outline = '2px dotted #FF8888'
      haserror = true
    }
  }
  byline = code.split('\n')
  for (i = 0; i < byline.length; i++) {
    if (/[가-힣ㄱ-ㅎ]/.test(byline[i].replace(/document.*'/g, '').replace(/prompt.*\)/g, ''))) {
      document.getElementById('run').innerHTML = (i + 1).toString() + '번째 줄이 문법에 어긋납니다..'
      document.getElementById('run').style.color = '#FF8888'
      document.getElementById('run').style.outline = '2px dotted #FF8888'
      haserror = true
    }
  }
}

function errlinecheck() {
  let code = convert()
  let input = document.getElementsByClassName("hwt-highlights hwt-content")[0].innertext || document.getElementsByClassName("hwt-highlights hwt-content")[0].textContent
  byline2 = input.split('\n')
  errlines = []
  for (i = 0; i < byline2.length; i++) {
    if (/[^ 가-힣\?!\.,\n]/.test(byline2[i])) {
      if (i == 0) {
        errlines.push("A" + byline2[i])
      }
      else {
        errlines.push(byline2[i - 1] + '\nA' + byline2[i])
      }
    }
  }
  byline = code.split('\n')
  for (i = 0; i < byline.length; i++) {
    if (/[가-힣ㄱ-ㅎ]/.test(byline[i].replace(/document.*'/g, '').replace(/prompt.*\)/g, ''))) {
      if (i == 0) {
        errlines.push("A" + byline2[i])
      }
      else {
        errlines.push(byline2[i - 1] + '\nA' + byline2[i])
      }
    }
  }
  // console.log(errlines.map(x => new RegExp('^' + x.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') + '$', 'm')))
  // console.log(code)
  errlines = [...new Set(errlines)]
  // console.log(document.getElementsByClassName("hwt-highlights hwt-content")[0].innerHTML)
  errlines = errlines.map(x => new RegExp('(?<=' + x.split('A')[0].replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') + ')^' + x.split('A')[1].replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') + '$', 'mg'))
  // 
  console.log(errlines)
  return errlines
}
// function noerrlinecheck() {
//   let code = convert()
//   let input = document.getElementsByClassName("hwt-highlights hwt-content")[0].innertext || document.getElementsByClassName("hwt-highlights hwt-content")[0].textContent
//   byline2 = input.split('\n')
//   noerrlines = JSON.parse(JSON.stringify(byline2))
//   for (i = 0; i < byline2.length; i++) {
//     if (/[^ 가-힣\?!\.,\n]/.test(byline2[i])) {
//       noerrlines = noerrlines.filter(x => x != byline2[i])
//     }
//   }
//   byline = code.split('\n')
//   for (i = 0; i < byline.length; i++) {
//     if (/[가-힣ㄱ-ㅎ]/.test(byline[i].replace(/document.*'/g, '').replace(/prompt.*\)/g, ''))) {
//       noerrlines = noerrlines.filter(x => x != byline2[i])
//     }
//   }
//   noerrlines = noerrlines.filter(x => x != '')
//   return noerrlines.map(x => new RegExp('^' + x.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') + '$', 'mg'))
// }

// let prev = ''
// function editor() {
//   let now = document.getElementById('in').value
//   len = now.length
//   prevlen = prev.length
//   if (len < prevlen || len > prevlen+1) {
//     return
//   }
//   for (i = 0; i < prevlen; i++) {
//     if(now[nowlen-i-1]!=prev[prevlen-i-1]){
//       //달라진부분
//     }
//   }
//     prev = document.getElementById('in').value
// }