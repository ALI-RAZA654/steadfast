// Centralized API Client for Steadfast Deen Frontend
// Connects UI components to the Express/TypeScript Backend Server

const BASE_URL = 'http://localhost:5000/api/v1';

class ApiClient {
  private accessToken: string | null = null;

  setToken(token: string | null) {
    this.accessToken = token;
    if (token) {
      localStorage.setItem('sd_access_token', token);
    } else {
      localStorage.removeItem('sd_access_token');
    }
  }

  getToken(): string | null {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem('sd_access_token');
    }
    return this.accessToken;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>)
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
      credentials: 'include'
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data.data !== undefined ? data.data : data;
    } catch (error: any) {
      console.error(`API Error [${endpoint}]:`, error.message);
      throw error;
    }
  }

  // --- Auth APIs ---
  async login(email: string, pass: string) {
    const res: any = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass })
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  async register(data: any) {
    const res: any = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.token) this.setToken(res.token);
    return res;
  }

  async getMe() {
    return await this.request('/auth/me');
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  // --- Scholar & Teacher APIs ---
  async getTeachers(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    return await this.request(`/teachers${query ? '?' + query : ''}`);
  }

  async getTeacherById(id: string) {
    return await this.request(`/teachers/${id}`);
  }

  async updateTeacherProfile(data: any) {
    return await this.request('/teachers/profile', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }

  async getTeacherStudents() {
    return await this.request('/teachers/me/students');
  }

  async restrictStudent(id: string, type: string, reason: string) {
    return await this.request(`/teachers/students/${id}/restrict`, {
      method: 'POST',
      body: JSON.stringify({ type, reason })
    });
  }

  async getTeacherEarnings() {
    return await this.request('/teachers/me/earnings');
  }

  async requestPayout(amount: number, bankDetails: any) {
    return await this.request('/teachers/payouts', {
      method: 'POST',
      body: JSON.stringify({ amount, bankDetails })
    });
  }

  // --- LMS & Course APIs ---
  async getCategories() {
    return await this.request('/courses/categories');
  }

  async getCourses(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    return await this.request(`/courses${query ? '?' + query : ''}`);
  }

  async getCourseBySlug(slug: string) {
    return await this.request(`/courses/${slug}`);
  }

  async updateLessonProgress(lessonId: string, watchedSeconds: number, isCompleted: boolean) {
    return await this.request(`/courses/lessons/${lessonId}/progress`, {
      method: 'POST',
      body: JSON.stringify({ watchedSeconds, isCompleted })
    });
  }

  async getCertificates() {
    return await this.request('/courses/certificates/me');
  }

  // --- Booking & Consultations ---
  async createBooking(data: any) {
    return await this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getMyBookings() {
    return await this.request('/bookings/my-sessions');
  }

  // --- Payments (Razorpay INR) ---
  async createPaymentOrder(amount: number, purpose: string, referenceId?: string, couponCode?: string) {
    return await this.request('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount, purpose, referenceId, couponCode })
    });
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string, purpose: string, referenceId?: string) {
    return await this.request('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ razorpayOrderId: orderId, razorpayPaymentId: paymentId, razorpaySignature: signature, purpose, referenceId })
    });
  }

  // --- Coupons ---
  async validateCoupon(code: string, originalAmount: number) {
    return await this.request('/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code, originalAmount })
    });
  }

  async createCoupon(data: any) {
    return await this.request('/coupons', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async getCoupons() {
    return await this.request('/coupons');
  }

  // --- Quiz ---
  async getMcqQuestions(topic?: string) {
    return await this.request(`/quiz/questions${topic ? '?topic=' + topic : ''}`);
  }

  async submitQuiz(answers: any[]) {
    return await this.request('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  }

  async getQuizHistory() {
    return await this.request('/quiz/history');
  }

  // --- Wallet ---
  async getWalletBalance() {
    return await this.request('/wallet/balance');
  }

  async getWalletTransactions() {
    return await this.request('/wallet/transactions');
  }

  // --- Admin Command Center ---
  async getAdminDashboard() {
    return await this.request('/admin/dashboard');
  }

  async onboardScholar(data: any) {
    return await this.request('/admin/teachers/onboard', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async setUserStatus(userId: string, status: string, reason: string) {
    return await this.request(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reason })
    });
  }

  async getAdminPayouts() {
    return await this.request('/admin/payouts');
  }

  async updatePayoutStatus(payoutId: string, status: string, referenceNumber?: string) {
    return await this.request(`/admin/payouts/${payoutId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, referenceNumber })
    });
  }

  async getAIInsights() {
    return await this.request('/admin/analytics/insights');
  }

  async getRevenueForecast() {
    return await this.request('/admin/analytics/revenue-forecast');
  }
}

export const api = new ApiClient();
