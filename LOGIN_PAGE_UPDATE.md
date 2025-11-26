# تحديث صفحة تسجيل الدخول - Login Page Update

## نظرة عامة - Overview

تم تحديث صفحة تسجيل الدخول في مشروع Multi-event-management-system لتكون مشابهة للتصميم الموجود في مشروع frontend الرئيسي.

## التغييرات المنفذة - Changes Implemented

### 1. إعادة تصميم صفحة تسجيل الدخول

**الملف:** `src/views/auth/signIn/index.jsx`

#### المميزات الجديدة:
- ✅ تصميم من قسمين (Two-column layout):
  - **القسم الأيسر**: نموذج تسجيل الدخول مع الشعار
  - **القسم الأيمن**: صورة ترحيبية مع رسالة ترحيب

- ✅ نموذج تسجيل الدخول يحتوي على:
  - حقل اسم المستخدم (Username)
  - حقل كلمة المرور (Password) مع إظهار/إخفاء
  - رابط نسيت كلمة المرور (Forgot Password)
  - زر تسجيل الدخول (Login Button)

- ✅ نموذج إعادة تعيين كلمة المرور:
  - يظهر عند الضغط على "Forgot Password"
  - يحتوي على حقل اسم المستخدم
  - زر تغيير كلمة المرور
  - رابط للعودة لتسجيل الدخول

### 2. الألوان والتصميم

تم استخدام نفس الألوان من مشروع frontend:

```javascript
- اللون الأساسي (Primary): #e77324
- لون الخلفية الترحيبية: #fcebdf
- لون العنوان الرئيسي: #005099
- لون النص الثانوي: #7c7c7c
- لون النص الرئيسي: #4d4d4d
```

### 3. الصور المستخدمة

الصور موجودة في المجلدات التالية:

```
src/assets/img/logo/auth-logo.png     // شعار الموقع
src/assets/img/auth/banner.png        // صورة الترحيب
```

### 4. تحسينات CSS

**الملف:** `src/assets/css/App.css`

تم إضافة تنسيقات مخصصة للصفحة:
- أنيميشن fadeInUp للنموذج
- تنسيقات للحقول النصية
- تأثيرات hover للأزرار
- دعم الوضع المظلم والفاتح
- تصميم متجاوب (Responsive)

## الميزات التقنية - Technical Features

### 1. إدارة الحالة (State Management)

```javascript
const [credentials, setCredentials] = useState({
  username: "",
  password: "",
});
const [showPassword, setShowPassword] = useState(false);
const [selectedPage, setSelectedPage] = useState("login");
const [errorMessage, setErrorMessage] = useState({
  username: null,
  password: null,
  userCredentials: null,
});
```

### 2. التحقق من صحة النموذج (Form Validation)

```javascript
const isFormValid = () => {
  return (
    credentials?.password.trim() !== "" && 
    credentials?.username.trim() !== ""
  );
};
```

### 3. معالجة الأحداث (Event Handlers)

- `handleChange`: لمعالجة تغيير قيم الحقول
- `handleShowPassword`: لإظهار/إخفاء كلمة المرور
- `handleSubmit`: لإرسال نموذج تسجيل الدخول
- `resetPassword`: لإعادة تعيين كلمة المرور

## التصميم المتجاوب - Responsive Design

### Desktop View (> 768px)
- عرض القسمين جنباً إلى جنب
- القسم الأيسر: 50% من العرض
- القسم الأيمن: 50% من العرض

### Mobile View (< 768px)
- إخفاء القسم الأيمن (صورة الترحيب)
- عرض نموذج تسجيل الدخول بشكل كامل
- تقليل حجم الشعار

## كيفية الاستخدام - How to Use

### 1. تسجيل الدخول

```
1. أدخل اسم المستخدم
2. أدخل كلمة المرور
3. (اختياري) اضغط على أيقونة العين لإظهار/إخفاء كلمة المرور
4. اضغط على زر "Login"
```

### 2. نسيت كلمة المرور

```
1. اضغط على "Forgot Password?"
2. أدخل اسم المستخدم
3. اضغط على "Change Password"
4. سيتم إرسال رابط إعادة تعيين كلمة المرور
```

## المكونات المستخدمة - Components Used

من Chakra UI:
- `Box` - للحاويات
- `Flex` - للتخطيط المرن
- `Input` - للحقول النصية
- `InputGroup` & `InputRightElement` - لحقل كلمة المرور
- `Button` - للأزرار
- `Text` - للنصوص
- `Heading` - للعناوين
- `Image` - للصور
- `Icon` - للأيقونات
- `FormControl` - لإدارة النماذج

## التكامل مع Backend - Backend Integration

لتفعيل التكامل مع Backend، قم بتعديل الدوال التالية:

### تسجيل الدخول:

```javascript
const handleSubmit = async (event) => {
  event.preventDefault();
  
  // استبدل هذا بكود API الخاص بك
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // نجح تسجيل الدخول
      // احفظ التوكن وانتقل للصفحة الرئيسية
    } else {
      // فشل تسجيل الدخول
      setErrorMessage({
        userCredentials: data.message,
      });
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

### إعادة تعيين كلمة المرور:

```javascript
const resetPassword = async (event) => {
  event.preventDefault();
  
  // استبدل هذا بكود API الخاص بك
  try {
    const response = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      // تم إرسال رابط إعادة التعيين بنجاح
      alert('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
      setSelectedPage('login');
    } else {
      // فشل الإرسال
      setErrorMessage({
        userCredentials: data.message,
      });
    }
  } catch (error) {
    console.error('Reset password error:', error);
  }
};
```

## اختبار الصفحة - Testing

### للوصول إلى صفحة تسجيل الدخول:

```bash
# 1. شغل المشروع
npm start

# 2. افتح المتصفح على
http://localhost:3000/auth/sign-in
```

### اختبار المميزات:
1. ✅ عرض الشعار بشكل صحيح
2. ✅ عرض صورة الترحيب في القسم الأيمن
3. ✅ إدخال اسم المستخدم وكلمة المرور
4. ✅ إظهار/إخفاء كلمة المرور
5. ✅ عرض رسائل الأخطاء
6. ✅ التبديل بين نموذج تسجيل الدخول ونموذج إعادة تعيين كلمة المرور
7. ✅ التصميم المتجاوب على الموبايل

## الملفات المعدلة - Modified Files

```
Multi-event-management-system/
├── src/
│   ├── views/
│   │   └── auth/
│   │       └── signIn/
│   │           └── index.jsx          ✏️ تم تعديله
│   └── assets/
│       └── css/
│           └── App.css                ✏️ تم تعديله
└── LOGIN_PAGE_UPDATE.md               ✨ جديد
```

## ملاحظات مهمة - Important Notes

1. **الصور**: تأكد من وجود الصور في المسارات الصحيحة
2. **الخطوط**: تم استخدام خط Poppins من Google Fonts
3. **Chakra UI**: تأكد من أن Chakra UI مثبت في المشروع
4. **التوافق**: الصفحة متوافقة مع جميع المتصفحات الحديثة
5. **Dark Mode**: الصفحة تدعم الوضع المظلم من Chakra UI

## الخطوات التالية - Next Steps

1. **إضافة API Integration**: ربط النماذج مع Backend
2. **إضافة Validation**: تحسين التحقق من صحة البيانات
3. **إضافة Loading States**: إظهار حالة التحميل أثناء الإرسال
4. **إضافة Toast Notifications**: إضافة إشعارات للمستخدم
5. **إضافة Remember Me**: إضافة خيار تذكرني
6. **إضافة Social Login**: إضافة تسجيل الدخول عبر Google/Facebook

## الدعم - Support

إذا واجهت أي مشكلة أو كان لديك أي استفسار:
- راجع ملف README.md الرئيسي
- تحقق من console.log للأخطاء
- تأكد من تثبيت جميع الـ dependencies

---

**تاريخ التحديث:** 25 نوفمبر 2025
**الإصدار:** 1.0.0
**الحالة:** ✅ مكتمل ويعمل بشكل صحيح

