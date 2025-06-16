import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

declare global {
  interface Window {
    Swal: any; // SweetAlert2 global object
    supabase: any; // Supabase client global object
  }
}
const supabaseUrl = 'https://qlpubmruapkfndexuzod.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFscHVibXJ1YXBrZm5kZXh1em9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMjc0NzgsImV4cCI6MjA2NTYwMzQ3OH0.iWfDfP1UoomUH9xS1Pg3mq_qUiwRWCPHvSxr-XetvYE';


let supabase: any;

// Antarmuka (interface) untuk struktur data komentar
interface Comment {
  id: string;
  name: string;
  comment: string;
  user_id_session: string;
  created_at: string;
}

export const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newName, setNewName] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null); // State untuk menyimpan ID pengguna untuk sesi ini
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { t } = useLanguage(); // Menggunakan useLanguage hook yang sudah benar

  useEffect(() => {
    const loadExternalScripts = async () => {
      // Muat SweetAlert2 dari CDN
      const swalScript = document.createElement('script');
      swalScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      swalScript.async = true;
      document.body.appendChild(swalScript);

      // Muat Supabase JS dari CDN
      const supabaseScript = document.createElement('script');
      supabaseScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      supabaseScript.async = true;

      // Inisialisasi klien Supabase setelah script dimuat
      supabaseScript.onload = () => {
        if (window.supabase && !supabase) {
          supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
        }

        // Hasilkan atau ambil ID pengguna persisten untuk klien ini
        let storedUserId = localStorage.getItem('commentUserId');
        if (!storedUserId) {
          storedUserId = crypto.randomUUID(); // Gunakan crypto.randomUUID() untuk ID unik
          localStorage.setItem('commentUserId', storedUserId);
        }
        setUserId(storedUserId);
        setLoading(false); // Klien Supabase siap digunakan
      };
      document.body.appendChild(supabaseScript);

      return () => {
        // Bersihkan script saat komponen tidak digunakan
        document.body.removeChild(swalScript);
        document.body.removeChild(supabaseScript);
      };
    };

    loadExternalScripts();
  }, []); // Jalankan sekali saat komponen dimuat untuk inisialisasi Supabase dan pembuatan ID pengguna

  useEffect(() => {
    // Hanya siapkan pendengar snapshot jika klien Supabase dan userId sudah siap
    if (!supabase || !userId) {
      return;
    }

    // Siapkan pendengar real-time untuk komentar
    const channel = supabase
      .channel('public:comments') // Menggunakan saluran publik untuk tabel 'comments'
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, (payload: any) => {
        // Logika untuk menangani event INSERT, UPDATE, DELETE
        if (payload.eventType === 'INSERT') {
          setComments(currentComments => [payload.new as Comment, ...currentComments].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        } else if (payload.eventType === 'UPDATE') {
          setComments(currentComments =>
            currentComments.map(comment =>
              comment.id === payload.old.id ? (payload.new as Comment) : comment
            ).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          );
        } else if (payload.eventType === 'DELETE') {
          setComments(currentComments =>
            currentComments.filter(comment => comment.id !== payload.old.id)
          );
        }
      })
      .subscribe(); // Berlangganan perubahan real-time

    // Ambil komentar awal
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('*')
          .order('created_at', { ascending: false }); // Urutkan berdasarkan timestamp pembuatan

        if (error) throw error;
        setComments(data as Comment[]); // Pastikan data memiliki tipe Comment[]
        setLoading(false);
      } catch (e: any) {
        console.error("Error fetching comments:", e.message);
        if (window.Swal) {
          window.Swal.fire({
            title: t('swal.error_fetch_comments_title'),
            text: e.message || t('swal.error_fetch_comments_text'),
            icon: 'error',
          });
        }
        setLoading(false);
      }
    };

    fetchComments();

    // Membersihkan langganan saat komponen tidak digunakan
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase, userId]); // Jalankan ulang jika klien supabase atau userId berubah

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim() || !userId) {
      if (window.Swal) {
        window.Swal.fire({
          title: t('swal.input_incomplete_title'),
          text: t('swal.input_incomplete_text'),
          icon: 'warning',
        });
      }
      return;
    }

    let confirmSend = { isConfirmed: true }; // Default to true if Swal is not available
    if (window.Swal) {
      confirmSend = await window.Swal.fire({
        title: t('swal.confirm_send_title'),
        text: t('swal.confirm_send_text'),
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: t('swal.confirm_send_confirm_button'),
        cancelButtonText: t('swal.confirm_send_cancel_button'),
      });
    }

    if (!confirmSend.isConfirmed) return;

    if (window.Swal) {
      window.Swal.fire({
        title: t('swal.sending_comment_title'),
        text: t('swal.sending_comment_text'),
        allowOutsideClick: false,
        didOpen: () => {
          window.Swal.showLoading();
        },
      });
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('comments')
        .insert([
          {
            name: newName.trim(),
            comment: newComment.trim(),
            user_id_session: userId,
          },
        ]);

      if (error) throw error;
      setNewName('');
      setNewComment('');
      if (window.Swal) {
        await window.Swal.fire({
          title: t('swal.success_title'),
          text: t('swal.success_text'),
          icon: 'success',
        });
        window.location.reload(); // Refresh setelah sukses
      }
    } catch (e: any) {
      console.error("Error adding comment: ", e.message);
      if (window.Swal) {
      await window.Swal.fire({
        title: t('swal.failed_title'),
        text: t('swal.failed_text') + ` (${e.message || 'unknown error'})`,
        icon: 'error',
      });
      window.location.reload(); // Refresh juga setelah gagal
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="comments" className="py-20 relative z-0 overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('comments.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('comments.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmitComment} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('form.name_label')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={t('form.name_placeholder')}
                  required
                />
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('form.comment_label')}
                </label>
                <textarea
                  id="comment"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900 dark:text-gray-100"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t('form.comment_placeholder')}
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !userId}
              >
                <span>{loading ? t('form.submitting_button') : t('form.submit_button')}</span>
              </motion.button>
              {!userId && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('form.generating_user_id')}
                </p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {t('comments_list.title')}
              </h3>
            </div>
            {loading && comments.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">{t('comments_list.loading')}</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">{t('comments_list.no_comments')}</p>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2"> {/* Added scroll for comments list */}
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.05 }} // Staggered animation
                    className="flex items-start space-x-4 p-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 hover:shadow-lg transition-all"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {comment.name ? comment.name[0].toUpperCase() : '?'}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {comment.name}
                        {comment.user_id_session && (
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            (User ID: {comment.user_id_session.substring(0, 8)}...)
                          </span>
                        )}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">{comment.comment}</p>
                      {comment.created_at && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.created_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
        {/* Background Blur: tidak mengganggu klik */}
        <div className="pointer-events-none absolute top-20 left-20 w-80 h-80 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 right-20 w-64 h-64 -z-10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}