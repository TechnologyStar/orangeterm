import { KnowledgeBaseEntry } from '../types';

export class KnowledgeBase {
  private entries: KnowledgeBaseEntry[] = [
    {
      command: 'ls',
      description: 'List directory contents',
      usage: 'ls [OPTIONS] [FILE]...',
      examples: ['ls -la', 'ls -lh /var/log'],
      riskLevel: 'low',
    },
    {
      command: 'cd',
      description: 'Change directory',
      usage: 'cd [DIRECTORY]',
      examples: ['cd /home', 'cd ..'],
      riskLevel: 'low',
    },
    {
      command: 'pwd',
      description: 'Print working directory',
      usage: 'pwd',
      examples: ['pwd'],
      riskLevel: 'low',
    },
    {
      command: 'cat',
      description: 'Concatenate and display file contents',
      usage: 'cat [OPTIONS] [FILE]...',
      examples: ['cat file.txt', 'cat -n file.txt'],
      riskLevel: 'low',
    },
    {
      command: 'grep',
      description: 'Search text patterns in files',
      usage: 'grep [OPTIONS] PATTERN [FILE]...',
      examples: ['grep "error" logfile.txt', 'grep -r "pattern" /var/log'],
      riskLevel: 'low',
    },
    {
      command: 'systemctl',
      description: 'Control systemd services',
      usage: 'systemctl [COMMAND] [SERVICE]',
      examples: ['systemctl status nginx', 'systemctl restart apache2'],
      riskLevel: 'medium',
    },
    {
      command: 'top',
      description: 'Display system processes and resource usage',
      usage: 'top [OPTIONS]',
      examples: ['top', 'top -u username'],
      riskLevel: 'low',
    },
    {
      command: 'ps',
      description: 'Display process status',
      usage: 'ps [OPTIONS]',
      examples: ['ps aux', 'ps -ef | grep process'],
      riskLevel: 'low',
    },
    {
      command: 'df',
      description: 'Display disk space usage',
      usage: 'df [OPTIONS] [FILE]...',
      examples: ['df -h', 'df -i'],
      riskLevel: 'low',
    },
    {
      command: 'du',
      description: 'Estimate file and directory space usage',
      usage: 'du [OPTIONS] [FILE]...',
      examples: ['du -sh *', 'du -h --max-depth=1'],
      riskLevel: 'low',
    },
    {
      command: 'chmod',
      description: 'Change file permissions',
      usage: 'chmod [OPTIONS] MODE FILE...',
      examples: ['chmod 755 script.sh', 'chmod +x file'],
      riskLevel: 'medium',
    },
    {
      command: 'chown',
      description: 'Change file owner and group',
      usage: 'chown [OPTIONS] OWNER[:GROUP] FILE...',
      examples: ['chown user:group file.txt', 'chown -R user directory/'],
      riskLevel: 'medium',
    },
    {
      command: 'tail',
      description: 'Display the last part of files',
      usage: 'tail [OPTIONS] [FILE]...',
      examples: ['tail -f /var/log/syslog', 'tail -n 100 logfile.txt'],
      riskLevel: 'low',
    },
    {
      command: 'head',
      description: 'Display the first part of files',
      usage: 'head [OPTIONS] [FILE]...',
      examples: ['head -n 20 file.txt', 'head -c 100 file.txt'],
      riskLevel: 'low',
    },
    {
      command: 'find',
      description: 'Search for files in directory hierarchy',
      usage: 'find [PATH] [OPTIONS] [EXPRESSION]',
      examples: ['find /var -name "*.log"', 'find . -type f -mtime -7'],
      riskLevel: 'low',
    },
    {
      command: 'netstat',
      description: 'Network statistics',
      usage: 'netstat [OPTIONS]',
      examples: ['netstat -tuln', 'netstat -anp'],
      riskLevel: 'low',
    },
    {
      command: 'ss',
      description: 'Socket statistics',
      usage: 'ss [OPTIONS]',
      examples: ['ss -tuln', 'ss -s'],
      riskLevel: 'low',
    },
    {
      command: 'docker',
      description: 'Docker container management',
      usage: 'docker [COMMAND] [OPTIONS]',
      examples: ['docker ps', 'docker logs container_name', 'docker exec -it container bash'],
      riskLevel: 'medium',
    },
    {
      command: 'kubectl',
      description: 'Kubernetes cluster management',
      usage: 'kubectl [COMMAND] [OPTIONS]',
      examples: ['kubectl get pods', 'kubectl describe pod name', 'kubectl logs pod-name'],
      riskLevel: 'medium',
    },
    {
      command: 'rm',
      description: 'Remove files or directories',
      usage: 'rm [OPTIONS] FILE...',
      examples: ['rm file.txt', 'rm -r directory/'],
      riskLevel: 'high',
    },
  ];

  public query(keyword?: string): KnowledgeBaseEntry[] {
    if (!keyword || keyword.trim() === '') {
      return this.entries;
    }

    const lowerKeyword = keyword.toLowerCase();
    
    return this.entries.filter(entry => 
      entry.command.toLowerCase().includes(lowerKeyword) ||
      entry.description.toLowerCase().includes(lowerKeyword) ||
      entry.usage.toLowerCase().includes(lowerKeyword) ||
      entry.examples?.some(ex => ex.toLowerCase().includes(lowerKeyword))
    );
  }

  public getByCommand(command: string): KnowledgeBaseEntry | undefined {
    const baseCommand = command.split(' ')[0];
    return this.entries.find(entry => entry.command === baseCommand);
  }

  public addEntry(entry: KnowledgeBaseEntry): void {
    this.entries.push(entry);
  }

  public getAllEntries(): KnowledgeBaseEntry[] {
    return this.entries;
  }
}

export const knowledgeBase = new KnowledgeBase();
