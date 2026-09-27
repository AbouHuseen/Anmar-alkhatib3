const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

const setActiveTab = (targetId) => {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.target === targetId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  panels.forEach((panel) => {
    const matches = panel.id === targetId;
    panel.classList.toggle('active', matches);
    panel.hidden = !matches;
  });
};

tabButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveTab(button.dataset.target));
});

const whatsappNumber = '963935141576';
const paymentMessage = 'أرغب في حجز نظام AK12';

const form = document.getElementById('signupForm');
const modal = document.getElementById('successModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.querySelector('.modal-card p');
const allCloseButtons = document.querySelectorAll('[data-close="true"]');
const requiredFields = {
  fullName: document.getElementById('fullName'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone')
};

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
}

function showModal(message = 'يرجى التواصل مع المدرب عبر الواتساب لتفعيل خطتك.') {
  modalTitle.textContent = 'تم استلام طلبك بنجاح!';
  modalText.textContent = message;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function hideModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
}

allCloseButtons.forEach((btn) => {
  btn.addEventListener('click', hideModal);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    hideModal();
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  Object.entries(requiredFields).forEach(([key, field]) => {
    const value = field.value.trim();
    const hasError =
      !value ||
      (key === 'email' && !validateEmail(value)) ||
      (key === 'phone' && value.length < 7);

    field.classList.toggle('error', hasError);
    if (hasError) isValid = false;
  });

  if (!isValid) {
    return;
  }

  const signupValues = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim()
  };

  form.reset();
  Object.values(requiredFields).forEach((field) => field.classList.remove('error'));
  showModal('تم استلام طلب التسجيل بنجاح، وسيتم التواصل معك خلال ساعات العمل.');
  openWhatsApp(`أرغب في الاشتراك في نظام AK12، الاسم: ${signupValues.fullName || 'غير محدد'}، البريد: ${signupValues.email || 'غير محدد'}، الهاتف: ${signupValues.phone || 'غير محدد'}`);
});

const paymentMethodButtons = document.querySelectorAll('.method-btn');
const paymentForm = document.getElementById('paymentForm');
const paymentRequiredFields = {
  cardName: document.getElementById('cardName'),
  cardNumber: document.getElementById('cardNumber'),
  cardExpiry: document.getElementById('cardExpiry'),
  cardCvv: document.getElementById('cardCvv')
};

paymentMethodButtons.forEach((button) => {
  button.addEventListener('click', () => {
    paymentMethodButtons.forEach((item) => item.classList.toggle('active', item === button));
  });
});

paymentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  Object.entries(paymentRequiredFields).forEach(([key, field]) => {
    const value = field.value.trim();
    const hasError =
      !value ||
      (key === 'cardNumber' && value.replace(/\s+/g, '').length < 12) ||
      (key === 'cardExpiry' && !/^\d{2}\/\d{2}$/.test(value)) ||
      (key === 'cardCvv' && value.length < 3);

    field.classList.toggle('error', hasError);
    if (hasError) isValid = false;
  });

  if (!isValid) {
    return;
  }

  const paymentValues = {
    cardName: document.getElementById('cardName').value.trim(),
    method: document.querySelector('.method-btn.active')?.dataset.method || 'بطاقة ائتمانية'
  };

  paymentForm.reset();
  Object.values(paymentRequiredFields).forEach((field) => field.classList.remove('error'));
  showModal('تمت معالجة الدفع بنجاح، وسيتم إرسال تفاصيل الوصول إلى بريدك الإلكتروني وواتسابك فوراً.');
  openWhatsApp(`أرغب في تأكيد الدفع لنظام AK12، الاسم: ${paymentValues.cardName || 'غير محدد'}، المبلغ: 150 دولار، طريقة الدفع: ${paymentValues.method}`);
});