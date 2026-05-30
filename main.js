const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
const tabButtons = document.querySelectorAll('.tab-button');
const testPanels = document.querySelectorAll('.test-panel');
const sajuForm = document.getElementById('saju-form');
const loveForm = document.getElementById('love-form');
const iqForm = document.getElementById('iq-form');
const luckyBtn = document.getElementById('lucky-btn');

applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.tab;

        tabButtons.forEach(tab => {
            const isActive = tab === button;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });

        testPanels.forEach(panel => {
            const isActive = panel.id === targetId;
            panel.classList.toggle('is-active', isActive);
            panel.hidden = !isActive;
        });
    });
});

generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('number');
        numberDiv.textContent = number;
        numberDiv.style.backgroundColor = getNumberColor(number);
        lottoNumbersContainer.appendChild(numberDiv);
    });
});

sajuForm.addEventListener('submit', event => {
    event.preventDefault();
    const birthDate = document.getElementById('birth-date').value;
    const birthHour = Number(document.getElementById('birth-hour').value);
    const result = document.getElementById('saju-result');
    const dateScore = birthDate.replaceAll('-', '').split('').reduce((sum, value) => sum + Number(value), 0);
    const elementIndex = (dateScore + birthHour) % 5;
    const elements = [
        {
            name: '목(木) 기운',
            summary: '새로운 일을 시작하고 관계를 확장하는 힘이 강한 타입입니다.',
            tip: '아이디어가 많을수록 우선순위를 정하면 실행력이 좋아집니다.'
        },
        {
            name: '화(火) 기운',
            summary: '표현력과 추진력이 살아나는 타입입니다.',
            tip: '속도를 내기 전에 상대가 따라올 시간을 주면 균형이 좋아집니다.'
        },
        {
            name: '토(土) 기운',
            summary: '안정감과 책임감을 중시하는 타입입니다.',
            tip: '익숙한 방식에 머물지 말고 작은 변화를 시도하면 기회가 넓어집니다.'
        },
        {
            name: '금(金) 기운',
            summary: '기준이 분명하고 결과를 정리하는 능력이 좋은 타입입니다.',
            tip: '완벽함보다 적절한 타이밍을 함께 고려하면 만족도가 올라갑니다.'
        },
        {
            name: '수(水) 기운',
            summary: '관찰력과 적응력이 돋보이는 타입입니다.',
            tip: '생각이 깊어질수록 기록으로 정리하면 판단이 선명해집니다.'
        }
    ];
    const selected = elements[elementIndex];

    result.innerHTML = `<strong>${selected.name}</strong><p>${selected.summary}</p><p>${selected.tip}</p><p class="result-note">전문 사주풀이가 아닌 오락용 간단 해석입니다.</p>`;
});

loveForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(loveForm);
    const score = ['love1', 'love2', 'love3'].reduce((sum, key) => sum + Number(formData.get(key)), 0);
    const result = document.getElementById('love-result');
    let title = '천천히 마음을 여는 신중형';
    let description = '관계에서 안전함을 중요하게 보는 편입니다. 감정을 숨기기보다 부담 없는 표현부터 늘리면 연애 운의 흐름이 부드러워집니다.';

    if (score >= 8) {
        title = '소통이 강한 안정형';
        description = '감정을 표현하고 조율하는 힘이 좋습니다. 상대의 속도까지 배려하면 관계 만족도가 더 높아질 가능성이 큽니다.';
    } else if (score >= 6) {
        title = '균형을 찾는 현실형';
        description = '상황에 따라 표현과 거리두기를 조절하는 편입니다. 중요한 순간에는 원하는 것을 구체적으로 말하는 연습이 도움이 됩니다.';
    }

    result.innerHTML = `<strong>${title}</strong><p>${description}</p><p class="result-note">연애 운 테스트는 자기 점검용 콘텐츠이며 관계 결과를 보장하지 않습니다.</p>`;
});

iqForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(iqForm);
    const score = ['iq1', 'iq2', 'iq3', 'iq4', 'iq5'].reduce((sum, key) => sum + Number(formData.get(key)), 0);
    const result = document.getElementById('iq-result');
    const levels = [
        '문제 유형을 익히는 단계입니다. 규칙을 찾는 연습을 하면 빠르게 좋아질 수 있습니다.',
        '기본 추론 감각이 있습니다. 실수한 문제의 규칙을 다시 보면 다음 풀이가 쉬워집니다.',
        '패턴 파악이 안정적입니다. 숫자와 언어 추론을 균형 있게 다루는 편입니다.',
        '짧은 시간 안에 핵심 규칙을 잘 찾는 편입니다. 복합 문제에도 도전해 볼 만합니다.'
    ];
    const levelIndex = score <= 1 ? 0 : score <= 3 ? 1 : score === 4 ? 2 : 3;

    result.innerHTML = `<strong>${score} / 5점</strong><p>${levels[levelIndex]}</p><p class="result-note">공인 IQ 검사가 아니며 실제 지능지수를 산출하지 않습니다.</p>`;
});

luckyBtn.addEventListener('click', () => {
    const cards = [
        ['정리의 날', '미뤄둔 작은 일을 하나 끝내면 다음 선택이 쉬워집니다.', '추천 색상: 파랑'],
        ['표현의 날', '고마운 사람에게 짧게라도 마음을 전하면 흐름이 좋아집니다.', '추천 색상: 노랑'],
        ['집중의 날', '한 가지 목표만 정하고 25분 동안 몰입해 보세요.', '추천 색상: 초록'],
        ['전환의 날', '익숙한 순서를 조금 바꾸면 새로운 아이디어가 떠오를 수 있습니다.', '추천 색상: 흰색'],
        ['휴식의 날', '속도를 늦추고 컨디션을 회복하는 것이 더 좋은 선택일 수 있습니다.', '추천 색상: 보라']
    ];
    const selected = cards[Math.floor(Math.random() * cards.length)];
    document.getElementById('lucky-result').innerHTML = `<strong>${selected[0]}</strong><p>${selected[1]}</p><p>${selected[2]}</p>`;
});

function getNumberColor(number) {
    if (number <= 10) return '#fbc400';
    if (number <= 20) return '#69c8f2';
    if (number <= 30) return '#ff7272';
    if (number <= 40) return '#aaa';
    return '#b0d840';
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    themeToggle.textContent = isDark ? '라이트 모드' : '다크 모드';
}
