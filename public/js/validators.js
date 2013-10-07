// Validator for #form_post
var validator_form_post = $('#form_post').validate({
  errorClass: "text-danger",
  rules: {
    title: {
      required: true
    },
    body: {
      required: true,
      minlength: 10,
      maxlength: 10000
    },
    author: {
      required: true
    },
    mail: {
      required: true,
      email: true
    },
    del_pass:{
      required: true,
      minlength: 4,
      maxlength: 50,
      remote: {
        type: 'post',
        url: '/authenticate',
        dataType: 'json',
        data: {
          post_id: function(){
            return $('#post_id_post').val();
          },
          mail: function(){
            return $('#mail_post').val();
          },
          del_pass: function(){
            return $('#del_pass_post').val();
          }
        }
      }
    }
  }
});

// Validator for #form_delete
var validator_form_delete = $('#form_delete').validate({
  errorClass: "text-danger",
  rules: {
    mail: {
      required: true,
      email: true
    },
    del_pass:{
      required: true,
      maxlength: 24,
      remote: {
        type: 'post',
        url: '/authenticate',
        dataType: 'json',
        data: {
          post_id: function(){
            return $('#post_id_delete').val();
          },
          mail: function(){
            return $('#mail_delete').val();
          },
          del_pass: function(){
            return $('#del_pass_delete').val();
          }
        }
      }
    }
  }
});