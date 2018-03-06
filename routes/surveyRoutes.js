const mongoose=require('mongoose')
const requireLogin=require('../middleware/requireLogin')
const Mailer=require('../services/Mailer')
const surveyTemplate=require('../services/emailTemplates/surveyTemplate')
const Survey=mongoose.model('surveys')

module.exports=app=>{

  app.get('/api/surveys/thanks',(req,res)=>{
    res.send('Thanks for voting')
  })

  app.post('/api/surveys/',requireLogin,async (req,res)=>{
      if(req.user.credits<1){
        return res.status(403).send({error:'not enough credits'})
      }

      const{title,body,subject,recipients}=req.body;
      const survey=new Survey({
        title,
        body,
        subject,
        recipients:recipients.split(',').map(email=>({email})),
        _user:req.user.id,
        dateSent:Date.now()
      })

      //send the Mail
      const mailer=new Mailer(survey,surveyTemplate(survey))
      try {
        await mailer.send();
        await survey.save();
        req.user.credits-=1;
        const user=await req.user.save();
        res.send(user)

      } catch (err) {
          res.status(422).send(err)
      }

  })
}
