<template>
  <div id="review">
    <lh-page-header title="评 论"></lh-page-header>
    <div id="wrapper">
      <lh-table-entry :name="getReview.name"
                      :cover="getReview.cover"
                      :summary="getReview.summary"
                      :price="getReview.unitPrice"
                      :amount="getReview.amount"
                      :unit="getReview.unit">
      </lh-table-entry>
      <div id="rate">
        <span id="label">评分：</span>
        <lh-rater :form="form"></lh-rater>
      </div>
      <div id="content">
        <textarea placeholder="请填写您的评价..."
                  v-model="form.content"
                  autofocus></textarea>
      </div>
      <mt-button type="primary"
                 id="submit-button"
                 @click.native="handleSubmitButton"
                 size="large">
        提 交
      </mt-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Indicator} from 'mint-ui'
  export default {
    data() {
      return {
        form: {
          serialId: null,
          productSerialId: null,
          content: '',
          star: 5
        }
      }
    },
    computed: {
      ...mapGetters([
        'getReview'
      ])
    },
    methods: {
      handleSubmitButton() {
        Indicator.open({
          text: '提交中...',
          spinnerType: 'fading-circle'
        })
        let vm = this
        this.$store.dispatch('submitReview', this.form).then(
          data => {
            vm.$router.push({name: 'order'})
          },
          error => {
          }
        )
      }
    },
    created() {
      this.form.serialId = this.$route.query.orderSerialId
      this.form.productSerialId = this.$route.query.productSerialId
      if (!this.getReview) {
        this.$router.replace({name: 'home'})
      }
    },
    beforeDestroy() {
      Indicator.close();
    }
  }
</script>

<style scoped>
  #review {
    padding-top: 44px;
    min-height: 100%;
    background: #f9f9f9;
  }

  #wrapper {
    padding: 15px 10px 0;
  }

  #rate {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    background: white;
    margin-bottom: 10px;
    overflow: hidden;
  }

  #content {
    width: 100%;
    height: 200px;
    background: white;
  }

  textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 16px;
    outline: none;
  }

  #label {
    flex: 1;
    padding-left: 10px;
    font-weight: bold;
  }

  #submit-button {
    margin-top: 20px;
  }
</style>
