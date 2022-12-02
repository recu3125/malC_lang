function convert() {
  input = document.getElementById('in').value

  // 변수  (korvar[_0-9]+)
  // 숫자  


  //변수빼놓기
  function varreplacer(match, p1, offset, string) {
    p1 = p1.split('')
    var josa = ['을', '를', '은', '는', '이', '가', '로', '으', '와', '과']
    if (josa.includes(p1.slice(-1).join())) {
      return ('korvar_' + (p1.slice(0,-1).map(x => x.charCodeAt(0).toString())).join('_') + p1.slice(-1).join())
    }
    return ('korvar_' + (p1.map(x => x.charCodeAt(0).toString())).join('_'))
  }
  input = input.replace(/변수 ([가-힣]+)/g, varreplacer)

  function numreplacer(match, p1, offset, string) {
    kornum = p1.split('')
    if (kornum == ['영']) {
      return '0'
    }
    console.log(kornum)
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
        res+=one
        res *= Math.pow(10000, kor3.indexOf(kornum[i]) + 1)
      }
      if (kor1.indexOf(kornum[i]) != -1) {
        one = kor1.indexOf(kornum[i]) + 1
      }
      else{
        one=0
      }
    }
    return (res+one).toString()
  }
  input = input.replace(/숫자 ([일이삼사오육칠팔구십백천만억조영]+)/g, numreplacer)


  //basic +-*/
  input = input.replace(/(korvar[_0-9]+) 더하기 (korvar[_0-9]+)/g, '$1+$2')


  //var
  input = input.replace(/(korvar[_0-9]+)(을|를) (만든다|정의한다|생성한다)/g, 'var $1')
  input = input.replace(/(korvar[_0-9]+)(을|를) ([0-9]+)으로 (정의한다|생성한다)/g, 'var $1 = $3')
  input = input.replace(/(korvar[_0-9]+)(을|를) ([0-9\+\-\*/]+)로 (정의한다|생성한다)/g, 'var $1 = $3')

  //set
  input = input.replace(/(korvar[_0-9]+)(을|를) ((korvar[_0-9]+)|[0-9\+\-\*/]+)으로 (정한다|만든다|둔다|바꾼다|설정한다)/g, '$1 = $3')
  input = input.replace(/(korvar[_0-9]+)(을|를) ((korvar[_0-9]+)|[0-9\+\-\*/]+)로 (정한다|만든다|둔다|바꾼다|설정한다)/g, '$1 = $3')
  input = input.replace(/(korvar[_0-9]+)(을|를) (korvar[_0-9]+)(와|과) (같게 한다)/g, '$1 = $3')

  //+=, ++,...



  //if
  input = input.replace(/만약/g, '')
  input = input.replace(/만약에/g, '')
  input = input.replace(/(korvar[_0-9]+)(이|가) 참이라면/g, 'if ($1 == true){')
  input = input.replace(/(korvar[_0-9]+)(이|가) 거짓이라면/g, 'if ($1 == false){')
  input = input.replace(/(korvar[_0-9]+)(이|가) 참이 아니라면/g, 'if ($1 == false){')
  input = input.replace(/(korvar[_0-9]+)(이|가) 거짓이 아니라면/g, 'if ($1 == true){')
  input = input.replace(/\./g, '}')
  



  document.getElementById('out').value = input
}