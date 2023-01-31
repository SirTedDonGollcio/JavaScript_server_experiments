package Zadanie1;

public class RunnableZadanie1 implements Runnable
{
	int p=1;
	boolean czyWNieskonczonosc = false;
	
	public void run() 
	{
		do
		{
			for(int i=0;i<p;i++)
			{
				System.out.println("Nazwa watku: " + Thread.currentThread().getName() );
			}
		} 
		while(czyWNieskonczonosc);
		
	}
	
	RunnableZadanie1(int p)
	{
		if(p>=0)
		{
			this.p = p;
		}
		else
		{
			this.p = 1;
			this.czyWNieskonczonosc = true;
		}
	}
}
