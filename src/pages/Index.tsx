import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<string | null>(null);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, any>>({});
  
  // Profile data
  const [profile, setProfile] = useState({
    name: 'Александра Иванова',
    description: 'UX/UI дизайнер с 5-летним опытом создания цифровых продуктов',
    email: 'alexandra@example.com',
    avatar: '/img/156a9d26-22f5-4fb5-a405-978b569c3073.jpg'
  });

  // Survey categories
  const surveyCategories = [
    {
      id: 'lifestyle',
      title: 'Образ жизни',
      description: 'Расскажите о ваших привычках и предпочтениях',
      icon: 'Heart',
      progress: 75,
      questions: [
        { id: 'morning', type: 'radio', question: 'Какое время дня вам больше нравится?', options: ['Утро', 'День', 'Вечер', 'Ночь'] },
        { id: 'workout', type: 'switch', question: 'Занимаетесь ли вы спортом регулярно?' },
        { id: 'hobbies', type: 'text', question: 'Какие у вас хобби?' }
      ]
    },
    {
      id: 'work',
      title: 'Работа и карьера',
      description: 'Ваши профессиональные интересы и цели',
      icon: 'Briefcase',
      progress: 50,
      questions: [
        { id: 'position', type: 'text', question: 'Какая у вас должность?' },
        { id: 'experience', type: 'radio', question: 'Ваш опыт работы?', options: ['Менее года', '1-3 года', '3-5 лет', 'Более 5 лет'] },
        { id: 'goals', type: 'textarea', question: 'Какие у вас карьерные цели?' }
      ]
    },
    {
      id: 'interests',
      title: 'Интересы и увлечения',
      description: 'То, что вдохновляет вас в жизни',
      icon: 'Star',
      progress: 25,
      questions: [
        { id: 'books', type: 'switch', question: 'Любите ли вы читать?' },
        { id: 'music', type: 'text', question: 'Какая музыка вам нравится?' },
        { id: 'travel', type: 'radio', question: 'Как часто путешествуете?', options: ['Никогда', 'Раз в год', 'Несколько раз в год', 'Очень часто'] }
      ]
    }
  ];

  const handleSurveyAnswer = (questionId: string, answer: any) => {
    setSurveyAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const completedSurveys = surveyCategories.filter(cat => cat.progress === 100).length;
  const overallProgress = Math.round((surveyCategories.reduce((acc, cat) => acc + cat.progress, 0)) / surveyCategories.length);

  return (
    <div className="min-h-screen bg-background dark text-foreground p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 animate-fade-in">Личный кабинет</h1>
          <p className="text-muted-foreground">Управляйте своим профилем и заполняйте анкеты</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={18} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="surveys" className="flex items-center gap-2">
              <Icon name="FileText" size={18} />
              Анкеты
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <Card className="animate-scale-in">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{profile.name}</CardTitle>
                    <p className="text-muted-foreground mt-1">{profile.description}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "default" : "outline"}
                  className="hover-scale"
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
              </CardHeader>
              
              {isEditing && (
                <CardContent className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={profile.description}
                      onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </CardContent>
              )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Icon name="FileCheck" size={20} className="mr-2 text-primary" />
                    Анкеты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedSurveys}/{surveyCategories.length}</div>
                  <p className="text-sm text-muted-foreground">Заполнено</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Icon name="Target" size={20} className="mr-2 text-primary" />
                    Прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallProgress}%</div>
                  <Progress value={overallProgress} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-lg">
                    <Icon name="Calendar" size={20} className="mr-2 text-primary" />
                    Активность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">Дней подряд</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="surveys" className="space-y-6 animate-fade-in">
            {selectedSurvey ? (
              <Card className="animate-scale-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Icon name={surveyCategories.find(c => c.id === selectedSurvey)?.icon || 'FileText'} size={24} className="mr-2" />
                        {surveyCategories.find(c => c.id === selectedSurvey)?.title}
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">
                        {surveyCategories.find(c => c.id === selectedSurvey)?.description}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedSurvey(null)}
                      className="hover-scale"
                    >
                      <Icon name="X" size={20} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {surveyCategories.find(c => c.id === selectedSurvey)?.questions.map((question, index) => (
                    <div key={question.id} className="space-y-3 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <Label className="text-base font-medium">{question.question}</Label>
                      
                      {question.type === 'radio' && (
                        <RadioGroup 
                          value={surveyAnswers[question.id] || ''} 
                          onValueChange={(value) => handleSurveyAnswer(question.id, value)}
                        >
                          {question.options?.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={option} />
                              <Label htmlFor={option}>{option}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                      
                      {question.type === 'switch' && (
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={surveyAnswers[question.id] || false}
                            onCheckedChange={(checked) => handleSurveyAnswer(question.id, checked)}
                          />
                          <Label>{surveyAnswers[question.id] ? 'Да' : 'Нет'}</Label>
                        </div>
                      )}
                      
                      {question.type === 'text' && (
                        <Input
                          value={surveyAnswers[question.id] || ''}
                          onChange={(e) => handleSurveyAnswer(question.id, e.target.value)}
                          placeholder="Ваш ответ..."
                        />
                      )}
                      
                      {question.type === 'textarea' && (
                        <Textarea
                          value={surveyAnswers[question.id] || ''}
                          onChange={(e) => handleSurveyAnswer(question.id, e.target.value)}
                          placeholder="Ваш ответ..."
                          rows={3}
                        />
                      )}
                    </div>
                  ))}
                  
                  <div className="flex justify-end pt-4">
                    <Button onClick={() => setSelectedSurvey(null)} className="hover-scale">
                      <Icon name="Check" size={16} className="mr-2" />
                      Сохранить ответы
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surveyCategories.map((category, index) => (
                  <Card 
                    key={category.id} 
                    className="cursor-pointer hover-scale transition-all duration-200 hover:shadow-lg animate-scale-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                    onClick={() => setSelectedSurvey(category.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon name={category.icon} size={24} className="text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.title}</CardTitle>
                          </div>
                        </div>
                        <Badge variant={category.progress === 100 ? "default" : "secondary"}>
                          {category.progress}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс</span>
                          <span>{category.progress}%</span>
                        </div>
                        <Progress value={category.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="animate-scale-in">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Icon name="TrendingUp" size={16} className="mr-2 text-green-500" />
                    Общий прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{overallProgress}%</div>
                  <Progress value={overallProgress} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{animationDelay: '0.1s'}}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Icon name="Award" size={16} className="mr-2 text-yellow-500" />
                    Завершено анкет
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedSurveys}</div>
                  <p className="text-xs text-muted-foreground">из {surveyCategories.length} доступных</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{animationDelay: '0.2s'}}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Icon name="Flame" size={16} className="mr-2 text-orange-500" />
                    Дней подряд
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">активных дней</p>
                </CardContent>
              </Card>

              <Card className="animate-scale-in" style={{animationDelay: '0.3s'}}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-sm font-medium">
                    <Icon name="Clock" size={16} className="mr-2 text-blue-500" />
                    Среднее время
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5мин</div>
                  <p className="text-xs text-muted-foreground">на анкету</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="BarChart3" size={20} className="mr-2" />
                    Прогресс по категориям
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {surveyCategories.map((category, index) => (
                    <div key={category.id} className="space-y-2 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name={category.icon} size={16} className="mr-2" />
                          {category.title}
                        </span>
                        <span>{category.progress}%</span>
                      </div>
                      <Progress value={category.progress} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Activity" size={20} className="mr-2" />
                    Активность за неделю
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
                      <div key={day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-2">{day}</div>
                        <div 
                          className={`h-8 rounded-sm ${
                            index < 5 ? 'bg-primary' : 'bg-muted'
                          } animate-scale-in`}
                          style={{animationDelay: `${index * 0.1}s`}}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;