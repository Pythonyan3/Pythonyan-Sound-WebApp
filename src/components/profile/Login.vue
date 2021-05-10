<template>
    <div class="login">
      <header class="header">
        <router-link :to="{name: 'Main'}">
          <div class="header__logo">
              <img class="header__logo__icon" src="../../assets/images/snake_logo.png" alt="">
              <span class="header__logo__text">Pythonyan Sound</span>
          </div>
        </router-link>
      </header>
      <section class="login__section">
          <div class="container">
              <div class="login__section__inner">
                  <form class="login__form" action="">
                    <h2 class="section__text">To continue, log in to Pythonyan Sound.</h2>
                    
                    <div class="input__block">
                        <label class="label__item">Enter username or email address</label>
                        <input class="input__item"  placeholder="Username">
                    </div>

                    <div class="input__block">
                        <label class="label__item">Enter a password</label>
                        <input class="input__item" type="password" placeholder="Password">
                    </div>

                    <div class="input__block submit__block">
                        <input class="submit__login" type="submit" value="log in">
                    </div>

                    <div class="divider"></div>

                    <h2 class="section__text">Don't have an account?</h2>

                    <router-link :to="{name: 'Signup'}" class="sign__button">sign up for pythonyan sound</router-link>
                  </form>
              </div>
          </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  color: black;
}

.header{
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #d9dadc;
}

.header__logo{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.header__logo__icon{
  max-width: 100px;
}

.header__logo__text{
  font-weight: 600;
  font-size: 2rem;
}

.login__section{
  width: 100%;
}

.container{
width: 100%;
  max-width: 1185px;
  margin: 0 auto;
}

.login__section__inner{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.login__form{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 450px;
  margin-top: 50px;
}

.section__text{
  font-weight: 600;
  text-align: center;
}

.input__block{
  display: flex;
  flex-direction: column;
  margin-top: 25px;
}


.label__item{
  font-weight: 600;
  margin-bottom: 10px;
}

.input__item{
  height: 40px;
  padding: 6px 12px;   
  border: 1px solid #d9dadc;
}

input:focus{
  outline: none !important;
  border: 1px solid #919496;
}

.submit__block{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
}

.submit__login{
  min-width: 160px;
  padding: 16px 14px 18px;
  border: 0;
  border-radius: 100px;
  font-weight: 600;
  background-color: #FFCBDB;
  text-transform: uppercase;
  transition: 0.3s;
}

.submit__login:hover{
  background-color: #ffa1bd;
  cursor: pointer;
}

.divider{
  margin: 15px 0 15px 0;
  border-top: 1px solid #d9dadc;
}

.sign__button{
  color: black;
  margin-top: 15px;
  padding: 16px 0;
  letter-spacing: 2px;
  font-weight: 500;
  text-align: center;
  color: #616467;
  border: 1px solid #616467;
  border-radius: 500px;
  text-transform: uppercase;
  transition: 0.3s;
}

.sign__button:hover{
  color: white;
  background-color: #616467;
}
</style>
