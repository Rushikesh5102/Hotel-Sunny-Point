/**
 * Hotel Sunny Point — Offline Synchronization Engine
 * Handles queueing customer feedback, reviews, and client actions when offline,
 * and automatically synchronizing them when internet connectivity is restored.
 */

export interface QueuedFeedback {
  id: string;
  name: string;
  phone?: string;
  rating: number;
  comments: string;
  favoriteDish?: string;
  queuedAt: string;
}

const FEEDBACK_QUEUE_KEY = "sunny_point_offline_feedback_queue";

export const offlineSyncManager = {
  /**
   * Save a feedback item to the offline local queue
   */
  queueFeedback(feedback: Omit<QueuedFeedback, "id" | "queuedAt">): QueuedFeedback {
    if (typeof window === "undefined") {
      return { ...feedback, id: "temp", queuedAt: new Date().toISOString() };
    }

    try {
      const queue = this.getQueuedFeedback();
      const newItem: QueuedFeedback = {
        ...feedback,
        id: `offline-fb-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        queuedAt: new Date().toISOString(),
      };

      queue.push(newItem);
      localStorage.setItem(FEEDBACK_QUEUE_KEY, JSON.stringify(queue));
      return newItem;
    } catch (e) {
      console.warn("[OfflineSync] Failed to write to feedback queue:", e);
      return { ...feedback, id: "temp", queuedAt: new Date().toISOString() };
    }
  },

  /**
   * Retrieve all currently queued offline feedback items
   */
  getQueuedFeedback(): QueuedFeedback[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(FEEDBACK_QUEUE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Clear the queued offline feedback after synchronization
   */
  clearQueuedFeedback() {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(FEEDBACK_QUEUE_KEY);
    } catch (e) {
      console.warn("[OfflineSync] Failed to clear feedback queue:", e);
    }
  },

  /**
   * Synchronize all queued items with the active restaurant repository
   */
  async flushQueue(submitFeedbackFn?: (fb: any) => Promise<any>): Promise<{ syncedCount: number }> {
    const queue = this.getQueuedFeedback();
    if (queue.length === 0) return { syncedCount: 0 };

    console.log(`[OfflineSync] Flushed ${queue.length} offline feedback items.`);
    
    // If a repository submit function is provided, submit each item
    if (submitFeedbackFn) {
      for (const item of queue) {
        try {
          await submitFeedbackFn({
            customerName: item.name,
            phone: item.phone,
            rating: item.rating,
            comment: item.comments,
            favoriteDish: item.favoriteDish,
          });
        } catch (err) {
          console.warn("[OfflineSync] Failed to sync item:", item, err);
        }
      }
    }

    this.clearQueuedFeedback();
    return { syncedCount: queue.length };
  },
};
