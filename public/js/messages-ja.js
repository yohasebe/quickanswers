(function ($) {
  $.extend($.validator.messages, {
    required: "このフィールドは必須です。",
    remote: "このフィールドを修正してください。",
    email: "有効なEメールアドレスを入力してください。",
    url: "有効なURLを入力してください。",
    number: "有効な数字を入力してください。",
    digits: "数字のみを入力してください。",
    equalTo: "同じ値をもう一度入力してください。",
    maxlength: $.format("{0} 文字以内で入力してください。"),
    minlength: $.format("{0} 文字以上で入力してください。"),
    rangelength: $.format("{0} 文字から {1} 文字までの値を入力してください。"),
  });

  $.quickanswers = {
    messages: {
      txt_edit_post: "投稿内容の編集",
      txt_new_thread: "新しい質問の投稿",
      txt_new_reply: "新しい返信の投稿",
      txt_author: "お名前",
      txt_mail: "E-メール",
      txt_edit_pass: "編集用パスワード",
      txt_del_post: "投稿内容の削除",
      txt_title: "タイトル",
      txt_body: "内容",
      txt_cancel: "キャンセル",
      txt_submit: "投稿",
      txt_execute: "実行",
      txt_edit: "編集",
      txt_delete: "削除",
      txt_reply: "返信する",
      txt_success: "成功しました！",
      txt_error: "エラー！",
      txt_list_threads: "投稿された質問の一覧",
      txt_question_topic: "質問",
      txt_topic_started: "質問開始時",
      txt_last_updated: "最終更新時",
      txt_num_replies: "返信数",
      txt_replied: "返信あり",
      txt_unreplied: "返信なし",
      txt_terms_of_use: "この掲示板の使い方",
      txt_no_threads_yet: "まだ質問が投稿されていません。",
      txt_sort_instruction: "各カラムの見出しをクリックすると、リストをソートできます。"
    },
    instructions: {
      "質問や返信の投稿": "「新しい質問の投稿」あるいは「返信」ボタンを押してください。投稿の際にはE-mailアドレスと投稿用パスワードが必要です。",
      "質問や返信の編集および削除": "「編集」または「削除」ボタンを押してください。また、投稿の際に用いたのと同じE-mailアドレスとパスワードを入力してください。",
      "削除の際の注意": "投稿を削除すると、その投稿に対して付けられたすべての返信も一緒に削除されます。十分に注意してください。",
      "質問と返答の確認": "「投稿された質問の一覧」から各質問とそれに対する返答にアクセスできます。"
    }
  };
}(jQuery));
