code = ''
function convert() {
  input = document.getElementById('in').value

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
  var preinput
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
  input = input.replace(/만약 */g, '')
  input = input.replace(/만약에 */g, '')
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

  var preinput
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
  input = input.replace(/줄을 바꾼다/g, 'document.getElementById(\'out\').value += \'\\n\'')


  //for

  //input

  
  code = input
}

function run() {
  var haserror = false
  const regex = new RegExp('[가-힣ㄱ-ㅎ]');
  byline = code.split('\n')
  for (i = 0; i < byline.length; i++) {
    if (!byline[i].startsWith('document')&&regex.test(byline[i])) {
      document.getElementById('out').value = (i + 1).toString() + '번째 줄이 문법에 어긋납니다!'
      haserror = true
      break
    }
  }
  if (!haserror) {
    document.getElementById('out').value = ''
    try {
      eval(code);
    } catch (e) {
      output = ''
      function errreplacer(match, p1, offset, string) {
        p1 = p1.split('_').slice(1)
        console.log(p1)
        return ('변수 ' + p1.map(x=>String.fromCharCode(x)).join('').toString() + '가 정의되지 않았습니다!')
      }
      output = e.message.toString().replace(/korvar(.+) is not defined/g, errreplacer)
      document.getElementById('out').value = output
    }
  }
}